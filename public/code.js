function gotUnicorn(data) {
    // $("#results").html(JSON.stringify(data));
    var tableHeader = "<tr><th>" + "ID" + "</th><th>" + "Name" +"</th><th>" + "Gender" + "</th><th>" + "DOB" +"</th><th>" + "Weight" + "</th><th>" + "Vampires" + "</th><th>" + "Vaccinated" + "</th><th>" + "Loves" + "</th><th>" + "Test" + "</th><tr>";
    $("table").append(tableHeader);

    for (i = 0; i< data.length; i++) {
        var id = data[i]._id;
        var name = data[i].name;
        var gender = data[i].gender;
        var dob = data[i].dob;
        var weight = data[i].weight;
        var vampires = data[i].vampires;
        var vaccinated = data[i].vaccinated;
        var test = data[i].test;

        var loves = data[i].loves;
        var food = "";
        for (j=0; j<loves.length; j++) {
            food += "<li>" + loves[j] + "</li>"   
        }

        var row = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + gender + "</td><td>" + dob + "</td><td>" + weight + "</td><td>" + vampires + "</td><td>" +  vaccinated + "</td><td>" + "<ul>" + food + "</ul>" + "</td><td>" + test +"</td><tr>";
        
        $("table tbody").append(row);
    }
}

function findUnicornByName() {
    console.log($("#unicorn_name").val())

    $.ajax(
        {
            url: "https://limitless-shore-38816.herokuapp.com/findUnicornByName",
            type: "POST",
            data: {
                "unicornName": $("#unicorn_name").val()
            },
            success: gotUnicorn
        }
    )
}

function findUnicornByFood() {
appleIsChecked = "unchecked"
carrotIsChecked = "unchecked"

if ($("#apple").is(":checked"))
    appleIsChecked = "checked"
if ($("#carrot").is(":checked"))
    carrotIsChecked = "checked"

    $.ajax(
        {
            url: "https://limitless-shore-38816.herokuapp.com/findUnicornByFood",
            type: "POST",
            data: {
                "appleIsChecked": appleIsChecked,
                "carrotIsChecked": carrotIsChecked
            },
            success: gotUnicorn
        })
}


function findUnicornByWeight() {
    $.ajax(
        {
            url: "https://limitless-shore-38816.herokuapp.com/findUnicornByWeight",
            type: "POST",
            data: {
                "minimum" : $("#unicorn_weight_min").val(),
                "maximum" : $("#unicorn_weight_max").val()
            },
            success: gotUnicorn
        })

}

function filterUnicorns() {

}

function setup() {
    $("#grab_name").click(findUnicornByName)
    $("#grab_food").click(findUnicornByFood)
    $("#grab_weight").click(findUnicornByWeight)
    $("#filter_button").click(filterUnicorns)
    $("#filter").hide()
}



$(document).ready(setup)