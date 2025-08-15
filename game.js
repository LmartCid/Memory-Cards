
const NUMBER_OF_CARDS = 16; 
const CARD_REVERSE = "❓";  
const MILISECONDS_FLIPPBACK_DELAY = 1000; 
const MILISECONDS_TO_VICTORY_SCENE = 1000; 
const DEFAULT_CONTENT_CARD = [1, 2, 3, 4, 5, 6, 7, 8]; 
const FOOD_CONTENT_CARD = ["🍔", "🍟","🌭", "🍕","🥗", "🥪", "🍿", "🥩"]; 
const ANIMALS_CONTENT_CARD = ["🐵", "🐱", "🐸", "🐰", "🐤", "🐷", "🐶", "🦀",]; 
const MAGIC_CONTENT_CARD = ["🧙‍♂️", "🎩", "🔮", "✨", "🧙🏾‍♀️", "🧛‍♂️", "🦄", "🐉"]; 
const PLAY_AGAIN_SYMBOL = "🔁"; 
const BACK_MENU_SYMBOL = "🏠"; 
const THEMES = {"food":FOOD_CONTENT_CARD, "animals":ANIMALS_CONTENT_CARD, "magic":MAGIC_CONTENT_CARD}
const STYLES_THEMES = {"food": "food-theme-background", "animals": "animals-theme-background", "magic": "magic-theme-background"}
const DEFEAT_MESSAGE = "You have lost"; 
let currentTheme = "food"; 
let errors = 0; 


function generateGameBoard() {


    const board = document.createElement("div"); 
    board.classList.add("board-game"); 
    document.body.appendChild(board); 
    return board;    
} 

function generateDeckContent() { 

    let duplicatedContent = []; 
    duplicatedContent = [...THEMES[currentTheme], ...THEMES[currentTheme]]; 

    duplicatedContent.sort(() => {
        return Math.random() - 0.5; 
    })
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
            
            
            if(cardsSelected.length < 2 && card.innerText === CARD_REVERSE && errors < 5) { 
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
                    pressBackMenuOption(backMenuButtonn);  

                }, MILISECONDS_TO_VICTORY_SCENE)
                
            }  
        })  
    }); 
}



function compareCards(cards) { 
 
    const [card1, card2] = cards 

    if(card1.innerText !== card2.innerText) {
         console.log("No son iguales");
         errors += 1; 
         console.log("Has cometido un error. ");    
        setTimeout(() => { 
            card1.innerText = CARD_REVERSE; 
            card2.innerText = CARD_REVERSE; 

            if(errors === 5) {
                console.log("Has perdido. "); 
                const defeatInformationBox = showDefeatInformation(); 
                const backMenuButtonDefeat = createButton("Back to menu", "back-menu-defeat-option", defeatInformationBox);  
               

                backMenuButtonDefeat.addEventListener("click", () => {
                    errors = 0; 
                    const boardMenuContainer = document.querySelector(".board-game"); 
                    boardMenuContainer.remove(); 
                    document.body.className = ""; 
                    generateMainMenu(); 
                })
            }

        }, MILISECONDS_FLIPPBACK_DELAY) 
    }       
}

function showDefeatInformation() {
    const boardGameContainer = document.querySelector(".board-game"); 
    const defeatInformationBox = document.createElement("div"); 
    defeatInformationBox.classList.add("defeat-box");  
    defeatInformationBox.innerText = DEFEAT_MESSAGE; 
    boardGameContainer.appendChild(defeatInformationBox); 
    return defeatInformationBox;  
    
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
    const boardMenu = document.createElement("div"); 
    boardMenu.classList.add("main-menu"); 
    
    createStartMenuButton(boardMenu)
    createSelectThemesMenuButton(boardMenu); 
    document.body.appendChild(boardMenu);  
} 

function createSelectThemesMenuButton(boardMenu) { 
    const themesMenuButton = document.createElement("button"); 
    themesMenuButton.classList.add("selector-main-option");  
    themesMenuButton.innerText = "Themes"; 
    boardMenu.appendChild(themesMenuButton); 

    themesMenuButton.addEventListener("click", () => {
        boardMenu.remove();
        generateThemesScreen();   
    })  

}

function generateThemesScreen() { 
    const selectThemesBoard = document.createElement("div"); 
    selectThemesBoard.classList.add("themes-screen"); 
    const foodThemeButton = createButton("Food Theme", "food-theme-option", selectThemesBoard); 
    const animalsThemeButton = createButton("Animals Theme", "animals-theme-option",selectThemesBoard);   
    const magicThemeButton = createButton("Magic Theme", "magic-theme-option", selectThemesBoard); 
    const backMenuButton = createButton("🏠 Back to menu","back-menu-theme-screen", selectThemesBoard ); 
    document.body.appendChild(selectThemesBoard);  

    foodThemeButton.addEventListener("click", () => {
        currentTheme = "food"; 
    })

    animalsThemeButton.addEventListener("click", () => {
        currentTheme = "animals"; 
    })

    magicThemeButton.addEventListener("click", () => {
        currentTheme = "magic"; 
    })

    backMenuButton.addEventListener("click", () => {
        selectThemesBoard.remove(); 
        generateMainMenu(); 
    })
}


function createStartMenuButton (boardMenu) {

      
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

        document.body.className = ""; 
        document.body.classList.add(STYLES_THEMES[currentTheme]); 
        
        playGame();  
}

function createButton (text, className, parentContainer) {
    const button = document.createElement("button"); 
    button.innerText = text;  
    button.classList.add(className); 
    parentContainer.appendChild(button); 
    return button
}

function generateWinnerScreen(board) {   
    board.innerHTML = ""; 
    board.classList.remove("board-game"); 
    board.classList.add("winner-screen"); 
    
    createButton(`${PLAY_AGAIN_SYMBOL} Play again`, "play-again-option", board)
    createButton(`${BACK_MENU_SYMBOL} Back to main Menu`, "back-menu-option", board)
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
            document.body.className = ""; 
            generateMainMenu();  
        })  
} 
generateMainMenu();  

 
