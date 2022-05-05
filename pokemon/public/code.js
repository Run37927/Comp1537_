function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }




images = ""

function processPoke(data) {
    // console.log(data)
    images += `<div class="imgContainer">
    <div>NO. ${data.id}</div>
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}">
    </a>
    <div class="pokeName">${data.name}</div>
    </div>`
}

async function loadPokemonImages() {

    for (i = 1; i<=9; i++) {
        if (i%3 ==1) {
            images += `<div class="imgGroup">`
        }
        
        x = Math.floor(Math.random() * 100) + 1;

        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${x}/`,
            success: processPoke
        })
    
        if (i%3 == 0) {
            images += `</div>`
        }

    }

    $("main").html(images);
}

function displayBySpecies(speciesOfPokemon) {
    $("main").empty();
    for (i = 1; i <=150; i++) {
        $.ajax({
            type: "GET",
            url:`https://pokeapi.co/api/v2/pokemon/${i}/`,
            success: function (data) {
            
                if (data.species.name == speciesOfPokemon) {
                    
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
        })
    }
}

function displayByType(typeOfPokemon) {
    $("main").empty();
    for (i = 1; i<150; i++) {
        $.ajax({
            type: "GET",
            url:`https://pokeapi.co/api/v2/pokemon/${i}/`,
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
    // console.log(pokeName)
    
    $.ajax(
        {
            url:`https://pokeapi.co/api/v2/pokemon/${pokeName}/`,
            type: "GET",
            "success": function (data) {
                // console.log(data)
            
                images = `<div class="imgContainer">
                <div>NO. ${data.id}</div>
                <a href="/profile/${data.id}">
                <img src="${data.sprites.other["official-artwork"].front_default}">
                </a>
                <div class="pokeName">${data.name}</div>
                </div>`
                
                $("main").html(images);
            
            }
        }
    )
}






  
function setup() {
    loadPokemonImages();

    // search by name
    $('#getPokemon').click(getPokemon);

    
    $("#type").change(() => {
        pokeType = $("#type option:selected").val();
        // console.log(pokeType)
        displayByType(pokeType);  
    })

    $("#species").change(() => {
        pokeSpecies = $("#species option:selected").val();
        // console.log(pokeType)
        displayBySpecies(pokeSpecies);  
    })
}

$(document).ready(setup);