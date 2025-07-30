
const NUMBER_OF_CARDS = 16; 
const CARD_REVERSE = "❓";  
const MILISECONDS_FLIPPBACK_DELAY = 1000; 
const MILISECONDS_TO_VICTORY_SCENE = 1000; 
const DEFAULT_CONTENT_CARD = [1, 2, 3, 4, 5, 6, 7, 8]; 
const PLAY_AGAIN_SYMBOL = "🔁"; 
const BACK_MENU_SYMBOL = "🏠"; 

function generateGameBoard() {
    const board = document.createElement("div"); 
    board.classList.add("board-game"); 
    document.body.appendChild(board); 
    return board;    
} 

function generateDeckContent() {  
    const duplicatedContent = [...DEFAULT_CONTENT_CARD, ...DEFAULT_CONTENT_CARD]; 
    duplicatedContent.sort(() => {
        return Math.random() - 0.5; 
    }); 
    return duplicatedContent;  
}


function generateCards() { 

    const boardMenu = document.querySelector('.board-game')

    const cards = []; 
    for(let i = 0; i < NUMBER_OF_CARDS; i++) {  

        const card = document.createElement("div"); 
        card.classList.add("card-game"); 
        card.innerText = CARD_REVERSE; 
        boardMenu.appendChild(card);  
        cards.push(card);  
    } 
    return cards; 
}  



function playGame() {

    const board = document.querySelector('.board-game')
    const cards = generateCards();  

    const deckContent = generateDeckContent();  
    let cardsSelected = [];  

    cards.forEach((card, index) => { 
        card.addEventListener("click", () => {
            
            
            if(cardsSelected.length < 2 && card.innerText === CARD_REVERSE) { 
                card.innerText = deckContent[index]; 
                cardsSelected.push(card);  
            } 

            if(cardsSelected.length === 2) { 
                compareCards(cardsSelected); 
                cardsSelected = [];  
            }

            const cardsUp = checkIfPlayersWin();

            if(cardsUp) { 
                setTimeout(() => {
                    generateWinnerScreen(board); 
                    const winnerSceneButtons = getWinnerSceneButtons();
                    const backMenuButtonn = winnerSceneButtons[1]; 
                    pressPlayAgainOption(board); 
                    pressBackMenuOption(backMenuButtonn, DEFAULT_CONTENT_CARD);  

                }, MILISECONDS_TO_VICTORY_SCENE)
                
            }  
        })  
    }); 
}



function compareCards(cards) { 

    const [card1, card2] = cards

    if(card1.innerText === card2.innerText) {
        console.log("son iguales");  
    } 
    else {
        console.log("No son iguales");  
        setTimeout(() => { 
            card1.innerText = CARD_REVERSE; 
            card2.innerText = CARD_REVERSE; 
        }, MILISECONDS_FLIPPBACK_DELAY) 

    }
}

function checkIfPlayersWin() { 

    const cards = document.querySelectorAll(".card-game"); 
    const arrayCards = Array.from(cards);
    const flippedCards = arrayCards.filter(card => {
        return card.innerText !== CARD_REVERSE; 
    }) 
    return flippedCards.length === NUMBER_OF_CARDS;    
}



function generateMainMenu() {  
    // Pinta la pantalla

    // Crear boardMenu
    const boardMenu = document.createElement("div"); 
    boardMenu.classList.add("main-menu"); 
    
    createStartMenuButton(boardMenu)

    // const selectThemeMenuOption = document.createElement("button");  
    // selectThemeMenuOption.classList.add("selector-main-option"); 
    // selectThemeMenuOption.innerText = "Themes"; 
    // boardMenu.appendChild(selectThemeMenuOption);  

    document.body.appendChild(boardMenu);  
} 


function createStartMenuButton (boardMenu) {

      // Crear StartMenu
    const startMenuButton = document.createElement("button"); 
    startMenuButton.classList.add("start-main-option"); 
    startMenuButton.innerText = "Start"; 

    startMenuButton.addEventListener("click", () => goesToGame(boardMenu))

    boardMenu.appendChild(startMenuButton); 

}


function goesToGame (boardMenu) {

        boardMenu.innerHTML = "";
        boardMenu.classList.remove("main-menu"); 
        boardMenu.classList.add("board-game");   
        playGame();  
}






// function getMainMenuButtons() {  
//     const mainMenuButtons = []; 
//     const startButton = document.body.querySelector(".start-main-option"); 
//     const themeButton = document.body.querySelector(".selector-main-option"); 
//     mainMenuButtons.push(startButton, themeButton);  
//     return mainMenuButtons; 
// } 



function pressThemesOptionMenu(selectThemesButton, board) {  
    selectThemesButton.addEventListener("click", () => {
        
    })
    
}
 

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

function pressPlayAgainOption(board) { 

    const winnerSceneButtons = getWinnerSceneButtons();
     
        winnerSceneButtons[0].addEventListener("click", () => {
            board.remove(); 
            generateGameBoard(); 
            playGame();  
        })
    
}

function pressBackMenuOption(backMenuButton) {
     
        backMenuButton.addEventListener("click", () => { 
            const winnerBoardScene = document.body.querySelector(".winner-screen");
            winnerBoardScene.remove(); 
            generateMainMenu();  
            // const boardMenu = generateMainMenu();  
            // const  mainMenuButtons = getMainMenuButtons(); 
            // const startMenuButton = mainMenuButtons[0]; 
        })
    
}
    
generateMainMenu();  
// const menuButtons = getMainMenuButtons(); 
// const startMenuButton = menuButtons[0]; 
// const themesMenuButton = menuButtons[1]; 

 
