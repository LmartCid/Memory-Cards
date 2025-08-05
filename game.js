
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
const THEMES = {FOOD:"food", ANIMALS: "animals", MAGIC:"magic"}
let currentTheme = THEMES.FOOD; 

function generateGameBoard() {


    const board = document.createElement("div"); 
    board.classList.add("board-game"); 
    document.body.appendChild(board); 
    return board;    
} 

function generateDeckContent() { 

    let duplicatedContent = []; 

    if(currentTheme === THEMES.FOOD) {
        duplicatedContent = [...FOOD_CONTENT_CARD, ...FOOD_CONTENT_CARD]; 
        duplicatedContent.sort(() => {
        return Math.random() - 0.5; 
    });  
    } 

    if(currentTheme === THEMES.ANIMALS) { 
        duplicatedContent = [...ANIMALS_CONTENT_CARD, ...ANIMALS_CONTENT_CARD]; 
        duplicatedContent.sort(() => {
        return Math.random() - 0.5; 
    }); 
     
    } 

    if(currentTheme === THEMES.MAGIC) { 
        duplicatedContent = [...MAGIC_CONTENT_CARD, ...MAGIC_CONTENT_CARD]; 
        duplicatedContent.sort(() => {
        return Math.random() - 0.5; 
    }); 
    } 
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
                    pressBackMenuOption(backMenuButtonn);  

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
    createSelectThemesMenuButton(boardMenu); 



    // const selectThemeMenuOption = document.createElement("button");  
    // selectThemeMenuOption.classList.add("selector-main-option"); 
    // selectThemeMenuOption.innerText = "Themes"; 
    // boardMenu.appendChild(selectThemeMenuOption);  

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
    const foodThemeButton = createButton("Food Theme", "food-theme-option"); 
    const animalsThemeButton = createButton("Animals Theme", "animals-theme-option");   
    const magicThemeButton = createButton("Magic Theme", "magic-theme-option"); 
    const backMenuButton = createButton("🏠 Back to menu","back-menu-theme-screen" ); 
    document.body.appendChild(selectThemesBoard);  
    selectThemesBoard.appendChild(foodThemeButton); 
    selectThemesBoard.appendChild(animalsThemeButton); 
    selectThemesBoard.appendChild(magicThemeButton); 
    selectThemesBoard.appendChild(backMenuButton);   

    // Aqui van las acciones que ejecutaran cada uno de los botones: 

    foodThemeButton.addEventListener("click", () => {
        currentTheme = "food"; 
        console.log("El tema seleccionado es comida"); 
    })

    animalsThemeButton.addEventListener("click", () => {
        currentTheme = "animals"; 
        console.log("El tema seleccionado es animales");  
    })

    magicThemeButton.addEventListener("click", () => {
        currentTheme = "magic"; 
        console.log("El tema seleccionado es magia. "); 
    })

    backMenuButton.addEventListener("click", () => {
        selectThemesBoard.remove(); 
        generateMainMenu(); 
    })
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

        if(currentTheme === THEMES.FOOD) { 
            document.body.className = ""; 
            document.body.classList.add("food-theme-background"); 
        }

        if(currentTheme === THEMES.ANIMALS) {  
            document.body.className = ""; 
            document.body.classList.add("animals-theme-background"); 
        } 

        if(currentTheme === THEMES.MAGIC) { 
            document.body.className = ""; 
            document.body.classList.add("magic-theme-background"); 
        }
        
        playGame();  
}






// function getMainMenuButtons() {  
//     const mainMenuButtons = []; 
//     const startButton = document.body.querySelector(".start-main-option"); 
//     const themeButton = document.body.querySelector(".selector-main-option"); 
//     mainMenuButtons.push(startButton, themeButton);  
//     return mainMenuButtons; 
// } 


 
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
            document.body.className = ""; 
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

 
