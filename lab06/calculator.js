function addition() {
    // console.log("calculate_area () got called")
    // alert(jQuery("body").html());
    
    // alert(jQuery("#x").val());
    x = parseInt(jQuery("#x").val());
    y = parseInt(jQuery("#y").val());
    // console.log( r * r * 22/7)
    jQuery("#p1").html("Result: " + (x) + "+" + (y) + "=" + (x + y))
    jQuery("#history").append("<span class = 'blue'>" + (x) + "+" + (y) + "=" + (x + y) + "</span>" + "<br>");

}

function subtract() {
    // console.log("calculate_area () got called")
    // alert(jQuery("body").html());
    
    // alert(jQuery("#x").val());
    x = parseInt(jQuery("#x").val());
    y = parseInt(jQuery("#y").val());
    // console.log( r * r * 22/7)
    jQuery("#p1").html("Result: " + (x) + "-" + (y) + "=" + (x - y))
    jQuery("#history").append("<span class = 'pink'>" + (x) + "-" + (y) + "=" + (x - y) + "</span>" + "<br>");

}

function multiply() {
    // console.log("calculate_area () got called")  
    // alert(jQuery("body").html());
    
    // alert(jQuery("#x").val());
    x = parseInt(jQuery("#x").val());
    y = parseInt(jQuery("#y").val());
    // console.log( r * r * 22/7)
    jQuery("#p1").html("Result: " + (x) + "*" + (y) + "=" + (x * y))
    jQuery("#history").append("<span class='yellow'>" + (x) + "*" + (y) + "=" + (x * y) + "</span>" + "<br>");

}

function division() {
    // console.log("calculate_area () got called")
    // alert(jQuery("body").html());
    
    // alert(jQuery("#x").val());
    x = parseInt(jQuery("#x").val());
    y = parseInt(jQuery("#y").val());
    jQuery("#p1").html("Result: " + (x) + "/" + (y) + "=" + (x / y))

    jQuery("#history").append("<span class='orange'>" + (x) + "/" + (y) + "=" + (x / y) + "</span>" + "<br>");
}


    



function setup() {
    // console.log("setup () got called")
    jQuery("#add").click(addition);
    jQuery("#sub").click(subtract);
    jQuery("#mul").click(multiply);
    jQuery("#div").click(division);
   

}
jQuery(document).ready(setup);