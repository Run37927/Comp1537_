// logic for nav bar and cart nav bar
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

function openCart() {
    document.getElementById("myCart").style.width = "380px";
}

function closeCart() {
    document.getElementById("myCart").style.width = "0";
}


// get timestamps
var now = new Date(Date.now());
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  

// global variable images
images = ""
function processPoke(data) {
    images += `<div class="imgContainer">
    <div class="pokeID">NO. ${data.id}</div>
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}">
    </a>
    <div class="pokeName">${data.name}</div>
    <button class="bag-btn" data-id="1">Add to cart</button>
    </div>`
}

async function loadPokemonImages() {

    for (i = 1; i<=9; i++) {
        if (i%3 ==1) {
            images += `<div class="imgGroup">`
        }
        
        x = Math.floor(Math.random() * 20) + 1;

        await $.ajax({
            type: "GET",
            url: `http://localhost:5000/api/v2/pokemon/${x}/`,
            success: processPoke
        })
    
        if (i%3 == 0) {
            images += `</div>`
        }

    }

    $("main").html(images);
}



function displayByType(typeOfPokemon) {
    $("main").empty();
    for (i = 1; i<150; i++) {
        $.ajax({
            type: "GET",
            url:`http://localhost:5000/api/v2/pokemon/${i}/`,
            success: function (data) {
                for (x of data.types) {
                    if (x.type.name == typeOfPokemon) {
                        
                        images = `<div class="imgContainer">
                        <div>NO. ${data.id}</div>
                        <a href="/profile/${data.id}">
                        <img src="${data.sprites.other["official-artwork"].front_default}">
                        </a>
                        <div class="pokeName">${data.name}</div>
                        </div>`

                        $("main").append(images);
                    }
                 
                }
            }
        })
    }
};

function getPokemon() {

    pokeName = $("#searchPoke").val();
    
    $.ajax(
        {
            url:`http://localhost:5000/api/v2/pokemon/${pokeName}/`,
            type: "GET",
            "success": function (data) {
                console.log(data)
            
                    images = `<div class="">
                    <div>NO. ${data.id}</div>
                    <a href="/profile/${data.id}">
                    <img src="${data.sprites.other["official-artwork"].front_default}">
                    </a>
                    <div class="pokeName">${data.name}</div>
                    <button class='remover'> Remove me </button>
                    </div>`
                    
                    $("main").html("<h1>History</h1>");
                    $("#history").append(images);
                
            }
        }
    )
}


function getPokemonByAbility() {
    pokeAbility = $("#searchByAbilities").val();

    $.ajax({
        url: `https://pokeapi.co/api/v2/ability/${pokeAbility}/`,
        type: "GET",
        success: function(data) {
            abilityName = data.names.filter((obj1) => {
                return obj1.language.name == "en";
            }).map((obj2) => {
                return obj2.name
            });

            pokename = ""
            pokemonsWithThisAbility = data.pokemon.map((obj_) => {
                return obj_.pokemon.name
            });
         
            for (i=0; i<10; i++) {
                pokename += `<div>${pokemonsWithThisAbility[i]}</div>`
            }
            $("main").html(`<div class="abilitypoke">` + `<div class="abilityName">`+ abilityName + `</div>` + pokename + `</div>`)
        }
    })
}

hide = function () {
    console.log(this)
    jQuery(this).parent().empty();
}

function insertSearchEventToTimeline(pokeType) {
    $.ajax({
        url: "http://localhost:5000/timeline/insert",
        type: "PUT",
        data: {
            text: `Client has searched for ${pokeType}`,
            time: `${now}`,
            hits: 1
        },
        success: function(r) {
            console.log(r)
        }
    })
}

function insertEventByName() {
    nameOfPokes = document.getElementById("searchPoke").value
    $.ajax({
        url: "http://localhost:5000/timeline/insert",
        type: "put",
        data: {
            text: `Client has searched for Pokemon name: ${nameOfPokes}`,
            time: `${now}`,
            hits: 1
        },
        success: function (r) {
            console.log(r)
        }
    })
}

function setup() {
    loadPokemonImages();

    // search by name
    $('#getPokemon').click(getPokemon);
    $('#getPokemon').click(insertEventByName);
    // search by ability
    $("#getByAbilities").click(getPokemonByAbility)

    
    $("#type").change(() => {
        pokeType = $("#type option:selected").val();
        displayByType(pokeType);

        insertSearchEventToTimeline(pokeType)
    })

    $('body').on('click', '.remover', hide);

}

$(document).ready(setup);