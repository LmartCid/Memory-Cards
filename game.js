
const NUMBER_OF_CARDS = 16; 
const CARD_REVERSE = "❓";  
const MILISECONDS_FLIPPBACK_DELAY = 1000; 
const DEFAULT_CONTENT_CARD = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

function generateGameBoard() {
    const board = document.createElement("div"); 
    board.classList.add("board-game"); 
    document.body.appendChild(board); 
    return board;    
} 

function generateDeckContent(contentCards) {  
    const duplicatedContent = [...contentCards, ...contentCards]; 
    duplicatedContent.sort(() => {
        return Math.random() - 0.5; 
    }); 
    return duplicatedContent.slice(0, NUMBER_OF_CARDS);  
}


function generateCards(container) { 

    const cards = []; 
    for(let i = 0; i < NUMBER_OF_CARDS; i++) {  

        const card = document.createElement("div"); 
        card.classList.add("card-game"); 
        card.innerText = CARD_REVERSE; 
        container.appendChild(card);  
        cards.push(card);  
    } 
    return cards; 
}  



function playGame(cards, arrayContents) { 
    const cardsSelected = [];  
    cards.forEach((card, index) => { 
        card.addEventListener("click", () => {
            if(cardsSelected.length < 2 && card.innerText === CARD_REVERSE) { 
                card.innerText = arrayContents[index]; 
                cardsSelected.push(card);  
            } 
            if(cardsSelected.length === 2) { 
                compareCards(cardsSelected[0], cardsSelected[1]); 
                cardsSelected.length = 0;  

            }
        })
       
    }); 
}

function compareCards(card1, card2) {  
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
 
const container = generateGameBoard(); 
const cardsDeck = generateCards(container);  
const deckContent = generateDeckContent(DEFAULT_CONTENT_CARD); 
playGame(cardsDeck, deckContent);  
