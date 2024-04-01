/*var cardsArrayChar = ["R", "A", "J", "K", "U", "M", "S","V"];
var cardsArrayFruit =["🍎","🍌","🍇","🍓","🍉","🍒","🍍","🥝",
                        "🍎","🍌","🍇","🍓","🍉","🍒","🍍","🥝"] */

var cardsArrayFruit =[
    {name:"apple", icon:"image/apple.jpeg"},
    {name:"banana", icon:"image/banana.jpeg"},
    {name:"coconut", icon:"image/coconut.jpeg"},
    {name:"guva", icon:"image/guva.jpeg"},
    {name:"kivi", icon:"image/kivi.jpeg"},
    {name:"pineapple", icon:"image/pineapple.jpeg"},
    {name:"starberry", icon:"image/starberry.jpeg"},
    {name:"waterlemon", icon:"image/waterlemon.jpeg"},

    {name:"apple", icon:"image/apple.jpeg"},
    {name:"banana", icon:"image/banana.jpeg"},
    {name:"coconut", icon:"image/coconut.jpeg"},
    {name:"guva", icon:"image/guva.jpeg"},
    {name:"kivi", icon:"image/kivi.jpeg"},
    {name:"pineapple", icon:"image/pineapple.jpeg"},
    {name:"starberry", icon:"image/starberry.jpeg"},
    {name:"waterlemon", icon:"image/waterlemon.jpeg"},

]                     


let timerMinutes = 0;
let timerSeconds = 0;
let moves = 0;
let flippedCards = []
let gameStarted = false;
const gameBoard = document.getElementById('gameBoard');

function startGame() {
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
        shuffleCards();
        
        displayCards();
    }
}



function shuffleCards(){
    for(let i=cardsArrayFruit.length-1;i>=0;i--){
        const randIndex = Math.floor(Math.random()*(i+1));
        [cardsArrayFruit[i],cardsArrayFruit[randIndex]] = [cardsArrayFruit[randIndex],cardsArrayFruit[i]];
    }
}


function displayCards(){
    gameBoard.innerHTML = '';
    cardsArrayFruit.forEach((curr,index,arr)=>{
        const card = document.createElement('div');
        card.setAttribute('id',index);
        card.classList.add('cardback');
        card.classList.add('active');
        gameBoard.append(card);
        card.addEventListener('click',filpCard)
    })  
}


function filpCard(){
    if(flippedCards.length < 2){
        let cardId = this.getAttribute('id');
        let curr = cardsArrayFruit[cardId]; 
        flippedCards.push(this);
        this.classList.remove('cardback');
        const img = document.createElement('img');
        img.src = curr.icon;
        img.alt = curr.name;
        img.width = '100';
        img.height = '100';
        this.innerHTML = '';
        this.appendChild(img);
        if(flippedCards.length == 2)
        {
            checkMatch();
        }
    }
}


function checkMatch() {
    const card1Id = flippedCards[0].getAttribute('id');
    const card2Id = flippedCards[1].getAttribute('id');
    if (cardsArrayFruit[card1Id].name === cardsArrayFruit[card2Id].name) 
    {
        // Match found 
        setTimeout(() => {
            flippedCards[0].style.visibility = 'hidden';
            flippedCards[1].style.visibility = 'hidden';
            flippedCards = [];
            if (allCardsMatched()) {
                showCongratulations();
            }
        }, 1000);
    } 
    
    else 
    {
        // No match, flip the cards back after a delay
        setTimeout(() => {
            flippedCards[0].classList.add('cardback'); 
            flippedCards[1].classList.add('cardback'); 
            flippedCards[0].innerHTML = ''; 
            flippedCards[1].innerHTML = '';
            flippedCards[0].style.background = '';
            flippedCards[1].style.background = '';
            flippedCards = [];
        }, 1000);       
    }
    incrementMoveCount()
}


function startTimer() {
    setInterval(() => {
        timerSeconds++;
        if (timerSeconds === 60) {
            timerMinutes++;
            timerSeconds = 0;
        }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.textContent = `Timer : ${timerMinutes < 10 ? '0' + timerMinutes : timerMinutes}:${timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}`;
}

function incrementMoveCount() {
    moves++;
    updateMoveCountDisplay();
}

function updateMoveCountDisplay() {
    const moveCountDisplay = document.getElementById('moveCountDisplay');
    moveCountDisplay.textContent = `Move Count : ${moves}`;
}


function resetGame() {
    gameBoard.innerHTML = '';
    timerMinutes = 0;
    timerSeconds = 0;
    moves = 0;
    flippedCards = [];
    updateTimerDisplay();
    updateMoveCountDisplay();
    shuffleCards();
    displayCards();
}


function allCardsMatched() {
    return document.querySelectorAll('.cardback').length === 0;
}

function showCongratulations() {
    alert('Congratulations! You have matched all the cards!');
}