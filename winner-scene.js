
const PLAY_AGAIN_SYMBOL = "🔁"; 
const BACK_MENU_SYMBOL = "🏠";  

function createButton (text, className) {
    const button = document.createElement("button"); 
    button.innerText = text;  
    button.classList.add(className); 
    return button
}

function generateWinnerScreen(board) {   
    board.innerHTML = ""; 
    board.classList.remove("board-game"); 
    board.classList.add("winner-screen"); 
    
    const playAgainButton = createButton(`${PLAY_AGAIN_SYMBOL} Play again`, "play-again-option")
    const backMenuButton = createButton(`${BACK_MENU_SYMBOL} Back to main Menu`, "back-menu-option")

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

function pressPlayAgainOption(winnerSceneButtons, board, contentDefault) { 
    if(winnerSceneButtons.length === 2) { 
        winnerSceneButtons[0].addEventListener("click", () => {
            board.remove(); 
            const boardGame = generateGameBoard(); 
            const cards = generateCards(boardGame);  
            const deckContent = generateDeckContent(contentDefault);  
            playGame(cards, deckContent, boardGame);  
        })
    }
}

function pressBackMenuOption(winnerSceneButtons, contentDefault) {
    if(winnerSceneButtons.length === 2) { 
        winnerSceneButtons[1].addEventListener("click", () => { 
            const winnerBoardScene = document.body.querySelector(".winner-screen");
            winnerBoardScene.remove();  
            const boardMenu = generateMainMenu();  
            const  mainMenuButtons = getMainMenuButtons(); 
            pressStartOptionMainMenu(mainMenuButtons, boardMenu, contentDefault); 
        })
    }
}