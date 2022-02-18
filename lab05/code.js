function calculate_area() {
    r = parseInt(jQuery("#x").val());

    jQuery("#p1").html(r * r * Math.PI)
}


function setup() {
    // console.log("setup() got called")
    jQuery("#calc").click(calculate_area);
}
jQuery(document).ready(setup);