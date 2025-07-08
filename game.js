


// Constantes necesarias para usar en el resto de funciones que se implementen: 
const numberOfCards = 16; 
const cardReverse = "❓";  

function generateGameBoard() {
    const board = document.createElement("div"); 
    board.classList.add("board-game"); 
    document.body.appendChild(board); 
    return board;    
} 

function generateCards(container) {

    for(let i = 0; i < numberOfCards; i++) {  

        const card = document.createElement("div"); 
        card.classList.add("card-game"); 
        card.innerText = cardReverse; 
        container.appendChild(card);   
    }
}
 
const container = generateGameBoard(); 
generateCards(container);  
