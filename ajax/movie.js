function chuma(data) {

    for(i = 0; i < data.results.length; i++) {
        // console.log(data.results[i].original_title + "<br>");
        // console.log(data.results[i].overview);
        // console.log(data.results[i].poster_path);

      
        $('#para').append(data.results[i].original_title + "<br>");
        $('#para').append(data.results[i].overview +"<br>");
     
        address = data.results[i].poster_path
        img = `<img src='https://image.tmdb.org/t/p/w500/${address}'>`

        $('#para').append(img +"<br>");

        img = data.results[i].backdrop_path
        img_drop = `<button id="${img}" class="back_drop">Display BackDrop Image</button>`
        $('#para').append( img_drop + "<br>");
        
    
    }  

}


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
            "success": chuma
        }
    )
}


function setup() {
    $('#getMovie').click(getInfo);
    $('body').on("click", ".back_drop", displayBackDrop)

}

$(document).ready(setup);
