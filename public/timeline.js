

function loadEvents() {
    $.ajax({
        url:'https://afternoon-gorge-05391.herokuapp.com//timeline/getAllEvents',
        type: "GET",
        success: (data) => {
            console.log(data);
            for ( i=0; i< data.length; i++) {
                $("main").append(
                `<p>
                Event text - ${data[i].text} <br>
                Event time - ${data[i].time} <br>
                Event hits - ${data[i].hits} <br>
                
                <button class="likeBtn" id="${data[i]["_id"]}"> Like </button>
                <button class="deleteBtn" id="${data[i]["_id"]}"> Delete </button>
                </p>
                `)
            }
       
        }
    })
}

function incrementHitsByOne() {
    x = this.id
    $.ajax({
        url: `https://afternoon-gorge-05391.herokuapp.com//timeline/increaseHits/${x}`,
        type: "GET",
        success: () => {
            location.reload();
        }
    })
 
}

function deleteDiv() {
    x = this.id
    $.ajax({
        url: `https://afternoon-gorge-05391.herokuapp.com//timeline/remove/${x}`,
        type: "GET",
        success: (e) => {
            location.reload();
        }
    })
}


function setup() {
    loadEvents();
    $("body").on('click', '.likeBtn', incrementHitsByOne);
    $("body").on('click', '.deleteBtn', deleteDiv);

    
}


$(document).ready(setup);
