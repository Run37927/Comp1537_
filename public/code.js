// logic for nav bar and cart nav bar starts here
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
// logic for nav bar and cart nav bar ends here


// get timestamps
var now = new Date(Date.now());
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  

// grabbing pokemons from my own API server
images = ""
function processPoke(data) {
    images += `<div class="imgContainer">
    <div class="pokeID">NO. ${data.id}</div>
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}">
    </a>
    <div class="pokeName">${data.name}</div>
    <button class="bag-btn" data-id=${data.id}>Add to cart</button>
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
  
    for (i = 1; i<20; i++) {
        $.ajax({
            type: "GET",
            url:`http://localhost:5000/api/v2/pokemon/${i}/`,
            success: function (data) {
                for (x of data.types) {
                    if (x.type.name == typeOfPokemon) {
                        let result = '';

                        result += `<article>
                        <div class="imgContainer">
                        <div>NO. ${data.id}</div>
                        <a href="/profile/${data.id}">
                        <img src="${data.sprites.other["official-artwork"].front_default}" class="product-img">
                        </a>
                        <h3>${data.name}</h3>
                        <button class="bag-btn" data-id=${data.id}>ADD TO CART</button>
                        </div>
                        
                        </article>`
                        
                        $("main").append(result);
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


// timeline logic starts here
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

// timeline logic ends here


// shopping cart logic starts here

// the basket icon in the preheader
const basketBtn = document.querySelector(".basketBtn");
// the clear cart button
const clearBtn = document.querySelector(".clear-cart-btn");
// the whole cart nav bar on the right
const cartDOM = document.querySelector(".myCart");
// the number sitting on top of basket icon
const numberOfItems = document.getElementById("numberOfItems");
// the number after 'Your total:'
const cartTotal = document.querySelector(".cart-total");
// info about item sold in the grid part
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// initiate an empty array for cart
let cart = [];
// initiate empty array for buttonDom
let buttonsDOM = [];

// getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch('../api/v2/pokemon');
            let data = await result.json();
            let products = data.pokemon;
    
            products = products.map(item => {
                const id = item.id;
                const name = item.name;
                const price = item.weight;
                const image = item.sprites.other["official-artwork"].front_default;
                return {name,price,image,id}
            })
            return products
        } catch (error) {
            console.log(error)
        }
    }
}

// displaying the products, I don't think I need this part
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += 
            `
            <article class="product">
            <div class="img-container">
                <div class="pokeID">NO. ${product.id}</div>
                <a href="/profile/${product.id}">
                <img src=${product.image} alt="product" class="product-img">
                </a>
                <button class="bag-btn" data-id=${product.id}>ADD TO CART</button>
                <h3 class="pokeName">${product.name}</h3>
            </div>
            <h4>$ ${product.price}</h4>
            </article>
            `
        });
        productsDOM.innerHTML = result;
    }
    getBagButtons() {
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttonsDOM = buttons;

        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id == id );
           
            if (inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }
            button.addEventListener('click', (event) => {
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                // get product from products based on button id
                let cartItem = {...Storage.getProduct(id), amount: 1};
                // add product to myCart nav bar
                cart = [...cart, cartItem];
                // save cart to local storage
                Storage.saveCart(cart);
                // set cart values
                this.setCartValues(cart);
                // display cart item
                this.addCartItem(cartItem);
                // show the cart
            })
        })
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        numberOfItems.innerText = itemsTotal;
    }
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = 
        `<img src=${item.image} alt="single product">

        <div>
            <h4>${item.name}</h4>
            <h5>$ ${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>Remove</span>
        </div>

        <div>
            <i class="fa fa-plus" data-id=${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fa fa-minus" data-id=${item.id}></i>
        </div>`
        cartContent.appendChild(div);
        console.log(cartContent)
    }
}

// local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id == id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {ui.getBagButtons()})
});




function setup() {
    // loadPokemonImages();
    // search by name
    $('#getPokemon').click(getPokemon);
    // timeline compmonent
    $('#getPokemon').click(insertEventByName);
    // search by ability
    $("#getByAbilities").click(getPokemonByAbility)
    // search by type
    $("#type").change(() => {
        pokeType = $("#type option:selected").val();
        displayByType(pokeType);
        // timeline component
        insertSearchEventToTimeline(pokeType)
    })

    $('body').on('click', '.remover', hide);
}

$(document).ready(setup);