function addition() {
    // console.log("calculate_area () got called")
    // alert(jQuery("body").html());

    // alert(jQuery("#x").val());
    x = parseInt(jQuery("#x").val());
    y = parseInt(jQuery("#y").val());
    remove_button = "<button class='remover'> Remove me </button>";
    jQuery("#p1").html("Result: " + (x) + "+" + (y) + "=" + (x + y))
    jQuery("#history").append("<span class = 'blue'>" + (x) + "+" + (y) + "=" + (x + y) + remove_button + "</span>" + "<br>");

}

function subtract() {
    // console.log("calculate_area () got called")
    // alert(jQuery("body").html());

    // alert(jQuery("#x").val());
    x = parseInt(jQuery("#x").val());
    y = parseInt(jQuery("#y").val());
    remove_button = "<button class='remover'> Remove me </button>";
    jQuery("#p1").html("Result: " + (x) + "-" + (y) + "=" + (x - y))
    jQuery("#history").append("<span class = 'pink'>" + (x) + "-" + (y) + "=" + (x - y) + remove_button + "</span>" + "<br>");

}

function multiply() {
    // console.log("calculate_area () got called")  
    // alert(jQuery("body").html());

    // alert(jQuery("#x").val());
    x = parseInt(jQuery("#x").val());
    y = parseInt(jQuery("#y").val());
    remove_button = "<button class='remover'> Remove me </button>";
    jQuery("#p1").html("Result: " + (x) + "*" + (y) + "=" + (x * y))
    jQuery("#history").append("<span class='yellow'>" + (x) + "*" + (y) + "=" + (x * y) + remove_button + "</span>" + "<br>");

}

function division() {
    // console.log("calculate_area () got called")
    // alert(jQuery("body").html());

    // alert(jQuery("#x").val());
    x = parseInt(jQuery("#x").val());
    y = parseInt(jQuery("#y").val());
    remove_button = "<button class='remover'> Remove me </button>";
    jQuery("#p1").html("Result: " + (x) + "/" + (y) + "=" + (x / y))

    jQuery("#history").append("<span class='orange'>" + (x) + "/" + (y) + "=" + (x / y) + remove_button + "</span>" + "<br>");
}

// function increase() {
//     currentFont = parseInt($("#history").css("font-size"));
//     currentFont += 8;
//     $("#history").css("font-size", currentFont);
// }

// function decrease() {
//     currentFont = parseInt($("#history").css("font-size"));
//     currentFont -= 8;
//     $("#history").css("font-size", currentFont);
// }


function clear() {
    jQuery('#x').val("0") + jQuery('#y').val("0")
    jQuery('#history').empty()
    jQuery('#p1').empty()
}


hide = function () {
    jQuery(this).parent().empty();
}

function setup() {
    // console.log("setup () got called")
    jQuery("#add").click(addition);
    jQuery("#sub").click(subtract);
    jQuery("#mul").click(multiply);
    jQuery("#div").click(division);
    jQuery("#ac").click(clear);
    // jQuery("#up").click(increase);
    // jQuery("#down").click(decrease);

    jQuery('body').on('click', '.remover', hide);

}
jQuery(document).ready(setup);

