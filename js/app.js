//1. Add HTML elements: div for container, <div> for board, div to show current player, restart button, auto-timer(if you win difficuty is increased as time span decreases each round ) , button option to play computer or another player.

//2.) Use flexbox to create grid for board, disguish player 1 and player 2 pieces.
//3.)Add cached element for : board, player, playAgain msg, restart button,player option, and  timer
//4.)constant for winner, turn, time, box, tie
//5.) constant for all possible winning combos 
//5.)Add event listener for board, player,restart button, player option button  when clicked
//6 a.) create init function (start timer in init funtion )
//b.) create render funtion
//c.) create updateBoard function
//d.) create update msg function
//7. Evoke updateboard  and updatemsg function in render function.
//8. Create HandleClick funtion
//9. Create PlacePiece function
//10. Create checkforTie function
//11. Create checkForWinner function
//12. switchPlayerTurn Function
//13. Reset functionality and Stop when timer runs out

//AI OR NOT? 

/*----------------------------------Constants---------------------------------*/
let winningCombos = [ 
    [0, 1, 2, 3], [41, 40, 39, 38],[7, 8, 9, 10], 
    [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], 
    [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31], 
    [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], 
    [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22], 
    [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], 
    [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25], 
    [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], 
    [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], 
    [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10], 
    [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], 
    [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31], 
    [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], 
    [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22], 
    [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], 
    [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], 
    [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], 
    [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
    [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], 
    [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], 
    [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], 
    [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], 
    [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34] 
    ]; 

/*-----------------------------------Variables--------------------------------*/
let board, turn, winner, tie

/*--------------------------Cached Element Refernces--------------------------*/
const squares = document.querySelectorAll(".tile")
const msg = document.getElementById("msg")
const resetBtnEl= document.getElementById("reset")
const pieceEl = document.getElementById("piece")
const startEl = document.querySelector(".start")
/*----------------------------------Event Listeners---------------------------*/
window.addEventListener("load", init)
squares.forEach(function (sqr){
    sqr.addEventListener("click", handleClick)
}) 
resetBtnEl.addEventListener("click", init)
document.addEventListener("DOMContentLoaded", (e) =>{
    setTimeout(() => {
        startEl.classList.add('display-none');
    },2000);
})

/*----------------------------Drag and drop functionality---------------------*/
let mousePosition;
let offset = [0,0];
let isDown = false;


pieceEl.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        pieceEl.offsetLeft - e.clientX,
        pieceEl.offsetTop - e.clientY
    ];
}, true);
pieceEl.addEventListener('mouseup', function() {
    isDown = false;
}, true);

pieceEl.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        pieceEl.style.left = (mousePosition.x + offset[0]) + 'px';
        pieceEl.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);
/*---------------------------------Functions----------------------------------*/

function init(){ 
    board = [
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null];

    turn = 1
    winner = false
    tie = false 
    render()
}

function render(){
    upgradeBoard()
    updateMessage()

}

function upgradeBoard(){
    board.forEach(function(element,idx){
        let sqrValue= element
        if (element === null){ 
         squares[idx].style.backgroundColor = 'white'
        } else if( element === 1 ){
         squares[idx].style.backgroundColor= "red"
        } else if (element === -1){
         squares[idx].style.backgroundColor= "yellow"
        }
     })

}


function updateMessage(){
    if ((winner === false) && (tie === false) && (turn === -1)){
        msg.textContent =  "Player 1 it's your turn."
     } else if ((winner === false) && (tie === false) && (turn === 1)){
        msg.textContent = "Player 2 it's your turn."
    } else if ((winner === false) && (tie === true)){
        msg.textContent ="It's a tie."
     } else if ((winner === true) && (turn === -1)) {
        msg.textContent= "Player 1 WINS"
     } else if ((winner === true) && (turn === 1)) {
        msg.textContent= "Player 2 WINS"
     } else {
        msg.textContent = ""
     }
}


function handleClick(evt){
    const sqIdx = +evt.target.id.slice(3)
    console.log(sqIdx)
    if (board[sqIdx] !== null){
        return
    } else if (winner === true){
        return
    }
   let startPoint = 35
   while(board[sqIdx + startPoint] !== null){
    startPoint -= 7
   }
   board[sqIdx + startPoint] = turn

// placePiece(sqIdx)
checkForTie()
checkForWinner()
switchPlayerTurn()
render()
}

function placePiece(sqIdx){
    return (board[sqIdx] = turn)
    }

function checkForTie(){
    const hasNull = board.some(function(element){
        return element === null
    })
    //console.log(hasNull)
    if (hasNull === true) {
        return tie = false
    } else{
        return tie = true
    }
}


function checkForWinner(){
    winningCombos.forEach(function(winArr){
        if (Math.abs(board[winArr[0]] + board[winArr[1]] + board[winArr[2]] + board[winArr[3]]) === 4){
            winner = true
        }

    })
}


function switchPlayerTurn(){
    if (winner === true){
        return
    } else {
      return turn *= -1
    }
}

function dropPiece(){
    squares.forEach(function(element,idx){
        element.onmouseenter = ()=> {
            // onMouseEnteredColumn(idx % 7);
            console.log
        }
    })


}

//The minimax with alphbeta pruning
//transposition table