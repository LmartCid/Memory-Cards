
const PLAY_AGAIN_SYMBOL = "🔁"; 
const BACK_MENU_SYMBOL = "🏠";  

function generateWinnerScreen(board) {   
    board.innerHTML = ""; 
    board.classList.remove("board-game"); 
    board.classList.add("winner-screen"); 
    const playAgainButton = document.createElement("button"); 
    const backMenuButton = document.createElement("button"); 
    playAgainButton.innerText = `${PLAY_AGAIN_SYMBOL} Play again`;   
    backMenuButton.innerText = `${BACK_MENU_SYMBOL} Back to main Menu`; 
    playAgainButton.classList.add("play-again-option");  
    backMenuButton.classList.add("back-menu-option"); 
    board.appendChild(playAgainButton);  
    board.appendChild(backMenuButton);
    return board;       
}

function getWinnerSceneButtons() {
    const winnerSceneButtons = []; 
    const playAgainButton = document.body.querySelector(".play-again-option"); 
    const backMenuButton = document.body.querySelector(".back-menu-option"); 
    winnerSceneButtons.push(playAgainButton, backMenuButton);  
    return winnerSceneButtons; 
} 

function pressPlayAgainOption(winnerSceneButtons, board, contentCards) { 
    if(winnerSceneButtons.length === 2) { 
        winnerSceneButtons[0].addEventListener("click", () => {
            board.remove(); 
            const boardGame = generateGameBoard(); 
            const cards = generateCards(boardGame);  
            const deckContent = generateDeckContent(contentCards);  
            playGame(cards, deckContent, boardGame);  
        })

    }
}