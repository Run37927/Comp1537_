const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const MongoDBSession = require('connect-mongodb-session')(session);
app.set('view engine', 'ejs');
const http = require('http');
const https = require('https');
const pokemons = require("./pokemon.json")
const abilities = require("./ability.json")
const types = require("./type.json")
const serverUrl = "http://localhost:5000"
const mongoose = require('mongoose');
const userModel = require('./user');

app.listen(process.env.PORT || 5000, function (err) {
    if (err)
        console.log(err);
})


// session starts
const store = new MongoDBSession({
    url: "mongodb://localhost:27017/sessions",
    collection: "mySessions"
})

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));

app.use(session({
    secret: 'sshh', 
    saveUninitialized: false, 
    resave: false,
    store: store
}));
    
app.use(express.static('./public'));


const isAuth = (req,res,next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/login')
    }
}
  

app.get('/register', (req,res) => {
    res.render("register.ejs")
})

app.get('/login', (req,res) => {
    res.render("login.ejs")
})


app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    let user = await userModel.findOne({email});

    // if user exist, redirect him to register to try again
    if (user) {
        return res.redirect('/register')
    }

    // using bcrypt's hash method, pass it an argument, and salt to make it more random
    const hashedPassword = await bcrypt.hash(password, 12);

    user = new userModel({
        username, 
        email, 
        password: hashedPassword
    });

    // now use a mongoose method save() to save the user we just created above
    await user.save();
    // once finished creating the user, redirect him to login page
    res.redirect('/login');

})

app.post("/login", async (req,res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({email})

    // if the user doesn't exist, we redirect him to the login page to try again
    if (!user) {
        return res.redirect('/login')
    };

    // if the user was found, we need to compare the password with user's password we found in the database using bcrypt's compare method
    const isMatch = await bcrypt.compare(password, user.password);
    // if it does not match, redirect him back to login and try again
    if (!isMatch) {
        return res.redirect('/login');
    } else if (user._doc.isadmin) {
        console.log('logged in as admin')
        req.session.isAuth = true;
        res.redirect("/admin");
    } else {
        console.log("logged in as regular user")
        req.session.isAuth = true;
        res.redirect("/timeline");
    }

    // if it is a match, we want to log this use in, and redirect him to profile page  
    // req.session.isAuth = true;
    // res.redirect("/timeline");
})


app.get("/admin", isAuth, (req,res) => {
    res.sendFile(__dirname + "/public/admin.html");
})

app.get("/timeline", isAuth, (req,res) => {
    res.sendFile(__dirname + "/public/timeline.html");
})

app.post('/logout', (req,res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/")
    })
})
// session ends


// add a route for displaying userinfo in timeline page
app.get("/fetchuserdata/", isAuth, function(req, res) {
    userModel.find({ }, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Data " + JSON.stringify(data));
      }
      res.send(data[3]);
    })
  })
// end


app.get("/api/v2/pokemon", function(req,res){
    res.send(pokemons)
})

app.get("/api/v2/pokemon/:pokemonid", function(req, res){
    res.send(pokemons.pokemon[req.params.pokemonid])
})

app.get("/api/v2/ability/:pokeability", function(req, res){
    res.send(abilities.pokemon[req.params.pokeability])
})


app.get('/profile/:id', function (req, res){
    // const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    const url = `${serverUrl}/api/v2/pokemon/${req.params.id}`


    data = ""
    http.get(url, function(https_res) {
        https_res.on("data", function(chunk) {
            data += chunk;
        })

        https_res.on("end", function() {
            data = JSON.parse(data);

            abilitiesArray = data.abilities.map((objAbility) => {
                return objAbility.ability.name
            })

            statsArray = data.stats.filter((obj_) => {
                return obj_.stat.name == "hp";
            }).map((obj2) => {
                return obj2.base_stat
            });

            statsArrayAttack = data.stats.filter((obj_) => {
                return obj_.stat.name == "attack";
            }).map((obj2) => {
                return obj2.base_stat
            });

            statsArrayDefense= data.stats.filter((obj_) => {
                return obj_.stat.name == "defense";
            }).map((obj2) => {
                return obj2.base_stat
            });

            statsArraySpeed= data.stats.filter((obj_) => {
                return obj_.stat.name == "speed";
            }).map((obj2) => {
                return obj2.base_stat
            });

            statsArraySpecialAttack= data.stats.filter((obj_) => {
                return obj_.stat.name == "special-attack";
            }).map((obj2) => {
                return obj2.base_stat
            });

            typesArray = data.types.map((objType) => {
                return objType.type.name
            })

            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "height": data.height,
                "weight": data.weight,
                "hp": statsArray[0],
                "attack": statsArrayAttack[0],
                "defense": statsArrayDefense[0],
                "speed": statsArraySpeed[0],
                "specialattack": statsArraySpecialAttack[0],
                "abilities": abilitiesArray,
                "type": typesArray
            });
        })
    })
 
})


mongoose.connect("mongodb://localhost:27017/timelineDB",
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
      console.log("mongoDB connected")
  });





// timeline starts
const eventSchema = new mongoose.Schema({
  text: String,
  hits: Number,
  time: String
});

const eventModel = mongoose.model("timelineevents", eventSchema);

// the read in CRUD
app.get('/timeline/getAllEvents', function(req,res) {
    eventModel.find({ }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('data ' + data);
        }

        res.send(data);
    })
})

// THE CREATE IN CRUD
app.put('/timeline/insert', function(req,res) {
    console.log(req.body)
    eventModel.create({
        text: req.body.text,
        time: req.body.time,
        hits: req.body.hits
    }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('data' + data);
        }

        res.send(data);
    })
})

// THE update IN CRUD
app.get('/timeline/increaseHits/:id', function(req,res) {
    console.log(req.params)
    eventModel.updateOne({
        _id: req.params.id
    }, { $inc: { hits: 1} }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('data' + data);
        }

        res.send(data);
    })
})


// THE delete IN CRUD
app.get('/timeline/remove/:id', function(req,res) {
    
    eventModel.remove({ _id: req.params.id }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('data' + data);
        }

        res.send("delete is successful");
    })
})
// timeline ends