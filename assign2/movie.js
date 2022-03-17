function displayBackDrop() {
    x = $(this).attr('id')
    $("#backdrop").html(`<img src="https://image.tmdb.org/t/p/original${x}" width="100%">`)    
}


function getInfo() {
  
    x = $("#movie_name").val();
    $.ajax(
        {
            "url":`https://api.themoviedb.org/3/search/movie?api_key=ed4ef9b0f9bcb9c237ab83a2c2ffb909&query=${x}`,
            "type": "GET",
            "success": function chuma(data) {
                for(i = 0; i < data.results.length; i++) {
               
                    $('#result').append(data.results[i].original_title + "<br>");
                    $('#result').append(data.results[i].overview +"<br>");
                 
                    address = data.results[i].poster_path
                    img = `<img src='https://image.tmdb.org/t/p/w500/${address}' height="100px">`
            
                    $('#result').append(img +"<br>");
            
                    backdrop = data.results[i].backdrop_path
                    img_drop = `<button id="${backdrop}" class="back_drop">Display BackDrop Image</button>`
                    $('#result').append( img_drop + "<hr>");
                }  
            }
        }
    )
}


function setup() {
    $('#getMovie').click(getInfo);
    $('body').on("click", ".back_drop", displayBackDrop)
    

}

$(document).ready(setup);
