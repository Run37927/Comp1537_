function displayBackDrop() {
    x = $(this).attr('id')
    $("#backdrop").html(`<img src="https://image.tmdb.org/t/p/original${x}" width="100%">`)    
}


function getInfo() {
  
    x = $("#movie_name").val();
    let movieResults = [];

    const list_element = document.getElementById('result'); 
    const pagination_element = document.getElementById('pagination_wrapper');

    let currentPage = 1;
    let rows = 5;

    $.ajax({
        "url":`https://api.themoviedb.org/3/search/movie?api_key=ed4ef9b0f9bcb9c237ab83a2c2ffb909&query=${x}`,
        "type": "GET",
        "success": function (data) {
            movieResults = data.results;

         

            function displayList(items, wrapper, rows_per_page, page) {
                wrapper.innerHTML = "";
                page--;
                
                let start = rows_per_page * page; 
                let end = start + rows_per_page;
                let paginatedItems = items.slice(start, end);

                for (let i = 0; i < paginatedItems.length; i++) {
                    let item = paginatedItems[i];
                    count = i + 1;
                    $('#result').append("#" + count + " " + item.original_title + "<br>");
                    $('#result').append(item.overview +"<br>");
                
                    address = item.poster_path
                    img = `<img src='https://image.tmdb.org/t/p/w500/${address}' height="100px">`

                    $('#result').append(img +"<br>");

                    backdrop = item.backdrop_path
                    img_drop = `<button id="${backdrop}" class="back_drop">Display BackDrop Image</button>`
                    $('#result').append( img_drop + "<hr>");
                }
            };

            function setupPagination (items, wrapper, rows_per_page) {
                wrapper.innerHTML = "";
                
                let page_count = Math.ceil(items.length / rows_per_page);
                for (let i = 1; i < page_count + 1; i++) {
                    
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

                    
            $('#prev_btn').on('click', function () {
                currentPage = Math.max(currentPage - 1, 1);
                displayList(movieResults, list_element, rows, currentPage);
                setupPagination(movieResults, pagination_element, rows);
            });

                       
            $('#next_btn').on('click', function () {
                currentPage = Math.min(currentPage + 1, 4);
                displayList(movieResults, list_element, rows, currentPage);
                setupPagination(movieResults, pagination_element, rows);
            });

            $('#first').on('click', function () {
                currentPage = 1
                displayList(movieResults, list_element, rows, currentPage);
                setupPagination(movieResults, pagination_element, rows);
            });

            $('#last').on('click', function () {
                currentPage = Math.ceil(movieResults.length / rows);
                displayList(movieResults, list_element, rows, currentPage);
                setupPagination(movieResults, pagination_element, rows);
            });

           
        }
    });


}



function setup() {
    $('#getMovie').click(getInfo);
    $('body').on("click", ".back_drop", displayBackDrop)

}

$(document).ready(setup);
