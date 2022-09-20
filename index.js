const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#resetBtn");
const winConditions = [//arrays that holds all the directions in the game like 0 1 2|3 4 5|6 7 8
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];//default when no player clicked anything
let currentPlayer = "X";//The current player is X
let running = false;//it is false because i have to set the game before running turns true

initializeGame();//call the function that carries all the codes for the tic tac toe


function initializeGame(){//function to start restart the game
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    statusText.textContent = `${currentPlayer}'s turn`;//it writes current players turn in the html page
    restartBtn.addEventListener("click", restartGame);// To restart the game
    running = true;//Make it true because the codes that is the functionality has be written
    
}
function cellClicked(){//Function for when a cell is click that is when a player click a cell
    const cellIndex = this.getAttribute("cellIndex");//Get attribute cellIndex from the div tag in the html file
    if(options[cellIndex] != "" || !running){//iF options(that is the default cell not click) is not equals to what the player click and it is not running nothing will do anything
        return;
    }
    updateCell(this, cellIndex);//pass this
    checkWinner();//call a function to check winner
    
    
}


function updateCell(cell, index){//function that will write the player X and O when the player click the cell
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){//function to change player
    currentPlayer = (currentPlayer == "X") ? "O" : "X";//if the current player click X the next player turn will be O
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){//function to check winner
    let roundWon = false;//set to false because i need to write the code to check the winner before it is set to true
    for(let i = 0; i < winConditions.length; i++){//To illerate over the winCondition
        const condition = winConditions[i];
        const cellA = options[condition[0]];//in the game we have 3 rows 3 columns this is used
        const cellB = options[condition[1]];//to end 3 times like X X X
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;//if 1 of the cell is not complete the game continue like X X ? The game continues
        }
        if(cellA == cellB && cellB == cellC){//If cell A B C are equal then there is a winner e.g X X X you win
            roundWon = true;
            break;
        }
    }
    if(roundWon){//If round won is equals to true then 
        statusText.textContent = `${currentPlayer} wins!`;//The textcontent in the html page will X or O wins
        running = false;//game over
    }
    else if(!options.includes("")){//If no place for the user to click then a draw
        statusText.textContent = "Draw!";
        running = false;
    }
    else{
        changePlayer();//To change player
    }
}

function restartGame(){//function to restart game
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}