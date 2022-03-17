let movieResults = [];
x = $("#movie_name").val();
$.ajax({
    "url":`https://api.themoviedb.org/3/search/movie?api_key=ed4ef9b0f9bcb9c237ab83a2c2ffb909&query=${x}`,
    "type": "GET",
    "success": function (data) {
        movieResults = data.results;

        const list_element = document.getElementById('result');
        const pagination_element = document.getElementById('pagination_wrapper');

        let currentPage = 1;
        let rows = 5;

        function displayList(items, wrapper, rows_per_page, page) {
            wrapper.innerHTML = "";
            page--;

            let start = rows_per_page * page; 
            let end = start + rows_per_page;
            let paginatedItems = items.slice(start, end);
        
            for (let i = 0; i < paginatedItems; i++) {
                let item = paginatedItems[i];
                let item_element = document.createElement('div');
                item_element.classList.add('item');
                item_element.innerText = item;

                wrapper.appendChild(item_element);
            }
        };

        

        function setupPagination (items, wrapper, rows_per_page) {
            wrapper.innerHTML = "";
            console.log(items);
            let page_count = Math.ceil(items.length / rows_per_page); // 20 / 5
            for (let i = 1; i < page_count + 1; i++) { // Should iterate 4 times
                // console.log(`Creating button: ${i}`);
                let btn = PaginationButton(i, items);
                wrapper.appendChild(btn);
            }
        }

        function PaginationButton (page, items) {
            let button = document.createElement('button');
            button.innerText = page;

            if (currentPage == page) button.classList.add('active');

            button.addEventListener('click', function () {
                currentPage = page;
                displayList(items, list_element, rows, currentPage);
                let current_btn = document.querySelector('#pagination_wrapper button.active');
                current_btn.classList.remove('active');

                button.classList.add('active');
            });

            return button;
        };

        displayList(movieResults, list_element, rows, currentPage);
        setupPagination(movieResults, pagination_element, rows);
    }
});




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
