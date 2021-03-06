const express = require('express')
const app = express()
// const cors = require('cors');
app.set('view engine', 'ejs');
const https = require('https')
// app.use(cors({
//     origin: '*',
//   }));
app.listen(5000, function (err) {
    if (err) console.log(err);
})

// app.get('/', function (req, res){
//     res.send('<h1>GET request to homepage</h1>')
// })


// app.get('profile/:id', function(req, res) {
//     const url = `https://pokeapi.co/api/v2/characteristic/${req.params.id}`
//     data = ""
//     https.get(url, function(https_res) {
//         https_res.on("data", function(chunk) {
//             data += chunk;
//         })

//         https_res.on("end", function() {
//             data = JSON.parse(data);
//             descriptionsArray = data.descriptions.filter((obj_) => {
//                 return obj_.language.name == "en";
//             }).map((obj2) => {
//                 return obj2.description
//             });

//             res.render("profile.ejs", {
//                 "id": req.params.id,
//                 "description": descriptionsArray[0]
//             });
//         })
//     })
// })

app.get('/profile/:id', function (req, res){
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`

    data = ""

    https.get(url, function(https_res) {
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
                "type": typesArray,
                "evolution1": "",
                "evolution2": "",
                "evolution3": ""
            });
        })
    })
 

    // res.json({
    //     "k1": "v1",
    //     "k2": "v2",
    //     "k3": "v3",
    // })
})

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "/index.html");
// })

app.use(express.static('./public'));