const cards = document.querySelectorAll('.memory-card')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this == firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // if hasFlippedCard is true, which means this is not the first flip
        hasFlippedCard = true;
        firstCard = this;
    } else {
        
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.name == secondCard.dataset.name) {
        // it's a match
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    } else {
        // not a match
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            
            resetBoard();
        }, 1500)
    }
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard))


easyBtn = document.getElementById('easy')
easyBtn.onclick = function() {
    const startingMinutes = 10;
    let time = startingMinutes * 60;
    
    const countdownEl = document.getElementById('countdown');
    
    setInterval(updatecountdown, 1000);
    
    function updatecountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
    
        seconds = seconds<10 ? '0' + seconds : seconds;
        countdownEl.innerHTML = `${minutes}:${seconds}`;
        time--
    }
};

hardBtn = document.getElementById('hard')
hardBtn.onclick = function() {
    const startingMinutes = 3;
    let time = startingMinutes * 60;
    
    const countdownEl = document.getElementById('countdown');
    
    setInterval(updatecountdown, 1000);
    
    function updatecountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
    
        seconds = seconds<10 ? '0' + seconds : seconds;
        countdownEl.innerHTML = `${minutes}:${seconds}`;
        time--
    }
}

