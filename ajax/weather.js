function chuma(data) {
    
    $("#temp").html(data.main.temp);
    $('#para').html(data.weather[0].description);
    var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    $('#img').attr('src', iconurl);
  

}


function getTempa() {
    x = $("#city_name").val()
    $.ajax(
        {
            
            "url":`https://api.openweathermap.org/data/2.5/weather?q=${x}&appid=50a030e8c07881f3bc4f94b20f7534d1&units=metric`,
                "type": "GET",
                "success": chuma
        }
    )
}



function setup() {
    $('#getTemp').click(getTempa);
}

$(document).ready(setup);