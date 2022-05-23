function loadEvents() {
    $.ajax({
        url:'http://localhost:5000/timeline/getAllEvents',
        type: "GET",
        success: (data) => {
            console.log(data);
            for ( i=0; i< data.length; i++) {
                $("ul").append(
                `
                    <li>
                        <div class="timeline-content">
                            <h2 class="date">${data[i].time}</h2>
                            <h1>${data[i].text}</h1>
                            <p>Event hits - ${data[i].hits}</p>
                            <button class="likeBtn" id="${data[i]["_id"]}"> Like </button>
                            <button class="deleteBtn" id="${data[i]["_id"]}"> Delete </button>
                        </div>
                    </li>
                `)
            }
       
        }
    })
}

function incrementHitsByOne() {
    x = this.id
    $.ajax({
        url: `http://localhost:5000/timeline/increaseHits/${x}`,
        type: "GET",
        success: () => {
            location.reload();
        }
    })
 
}

function deleteDiv() {
    x = this.id
    $.ajax({
        url: `http://localhost:5000/timeline/remove/${x}`,
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
