
function generateMainMenu() {  
    const boardMenu = document.createElement("div"); 
    boardMenu.classList.add("main-menu");  
    const startMenuButton = document.createElement("button"); 
    startMenuButton.classList.add("start-main-option"); 
    const selectThemeMenuOption = document.createElement("button");  
    selectThemeMenuOption.classList.add("selector-main-option"); 
    startMenuButton.innerText = "Start"; 
    selectThemeMenuOption.innerText = "Themes"; 
    boardMenu.appendChild(startMenuButton); 
    boardMenu.appendChild(selectThemeMenuOption);  
    document.body.appendChild(boardMenu);  
    return boardMenu;     
} 

function getMainMenuButtons() {  
    const mainMenuButtons = []; 
    const startButton = document.body.querySelector(".start-main-option"); 
    const themeButton = document.body.querySelector(".selector-main-option"); 
    mainMenuButtons.push(startButton, themeButton);  
    return mainMenuButtons; 
} 

function pressStartOptionMainMenu(startMainMenuButton, board, contentDefault) {

            startMainMenuButton.addEventListener("click", () => {
            board.innerHTML = "";
            board.classList.remove("main-menu"); 
            board.classList.add("board-game");   
            const deckContent = generateDeckContent(contentDefault); 
            const cards = generateCards(board);  
            playGame(cards, deckContent, board);  
        })

        
}  

function pressThemesOptionMenu(mainMenuButtons, board) { 
    // Refactor, darle una vuelta
    if(mainMenuButtons.length === 2) { 
        mainMenuButtons[1].addEventListener("click", () => {
            // Pasar a la pantalla de seleccion de temas. 
        })

    }
}
