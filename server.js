const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const http = require('http');
const https = require('https');
const pokemons = require("./pokemon.json")
const abilities = require("./ability.json")
const types = require("./type.json")
const serverUrl = "http://localhost:5000"
const mongoose = require('mongoose');

app.listen(process.env.PORT || 5000, function (err) {
    if (err)
        console.log(err);
})

app.use(express.static('./public'));

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));


app.get("/api/v2/pokemon/:pokemonid", function(req, res){
    res.send(pokemons.pokemon[req.params.pokemonid])
})

app.get("/api/v2/pokemon/:pokemonname", function(req, res){
    res.send(pokemons.pokemon[req.params.pokemonname])
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
  { useNewUrlParser: true, useUnifiedTopology: true });

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
            console.log('data' + data);
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

        res.send("update is successful");
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