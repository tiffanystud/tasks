/* Uppgift U1b */

// Globala konstanter och variabler
const wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANT", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD", "DATORSPEL", "WEBBPLATS", "TELEFON", "STJÄRNA", "KANELBULLE", "SEMLA", "ÄPPELPAJ", "BLÅBÄR", "LINGONSYLT", "TRAKTOR", "CYKELKEDJA", "BOKHYLLA", "BOKSTAV", "GRILLPLATS", "SOLSTOL", "BADPLATS", "SNÖGUBBE", "PARAPLY"]; // Lista (array) med ord som ska väljas slumpmässigt
let randomWord = "BLOMMA";	        // Textsträng med det ord som slumpmässigt väljs ur wordList
let boxElems;	        // Array med span-element för bokstäverna i ordet
let startBtn;	        // button-element för startknappen
let letterButtons;	    // Array med button-element för bokstavsknapparna
let hangmanImg;		    // img-elementet för bilder på galgen och gubben
let hangmanNr;		    // Nummer för aktuell bild som visas (0-6)
let msgElem;	        // div-element för meddelanden
let startTime;		    // Tid då spelet startas
// --------------------------------------------------
// Initiering då webbsidan laddats in
function init() {
    startBtn = document.querySelector("#startBtn");
    letterButtons = document.querySelectorAll("#letterButtons button");
    hangmanImg = document.querySelector("#hangman");
    msgElem = document.querySelector("#message");


    startBtn.disabled = false;
    letterButtons.forEach(button => {
        button.disabled = true;
    });

    startBtn.addEventListener("click", startGame);
    letterButtons.forEach(button => {
        button.addEventListener("click", guessLetter);
    });


} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------
// Initiera ett nytt spel. Visa första bilden (h0.png),
// sätt bildnummer till 0, inaktivera startknapp och aktivera bokstavsknappar.
function startGame() {

    startBtn.disabled = true;
    letterButtons.forEach(button => {
        button.disabled = false;
    });

    hangmanImg.src = "img/h0.png";
    hangmanNr = 0;
    msgElem.innerText = "";

    selectRandomWord();

} // Slut startGame
// --------------------------------------------------
// Ett ord väljs slumpmässigt. Visa en ruta för varje bokstav i ordet
function selectRandomWord() {
    randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    let letterBox = document.querySelector("#letterBoxes");
    letterBox.innerText = "";

    for (let i = 0; i < randomWord.length; i++) {
        let box = document.createElement("span");
        box.className = "letterBox";
        letterBox.appendChild(box);
    }

} // selectRandomWord
// --------------------------------------------------
// Kontrollera om bokstaven finns i ordet och skriv i så fall ut den.
// Om bokstaven ej finns, uppdateras bilden med galgen och gubben
// Om alla bokstäver är gissade eller om den sista bilden visades, avslutas spelet
function guessLetter(e) {
    let chosenLetter = e.target.value;
    e.target.disabled = true;

    let rightLetter = false;

    boxElems = document.querySelectorAll("#letterBoxes span");

    for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === chosenLetter) {
            boxElems[i].innerText = chosenLetter;
            rightLetter = true;
        }
    }

    if (!rightLetter) {
        hangmanNr++;
        hangmanImg.src = "img/h" + hangmanNr + ".png";
        if (hangmanNr == 6) {
            endGame(true);
            return;
        }
    }

    let completeWord = true;
    for (let i = 0; i < randomWord.length; i++) {
        if (!boxElems[i].innerText) {
            completeWord = false;
            break;
        }
    }

    if (completeWord) {
        endGame(false);
    }

} // Slut guessLetter
// --------------------------------------------------
// Avsluta spelet genom att skriva ut ett meddelande och
// sedan aktivera startknappen och inaktivera bokstavsknapparna
function endGame(manHanged) { // manHanged är true eller false
    if (manHanged) {
        msgElem.innerText = "Gubben hängdes. Det rätta order var: " + randomWord;
    } else {
        msgElem.innerText = "Du vann!";
    }

    startBtn.disabled = false;
    letterButtons.forEach(button => {
        button.disabled = true;
    })
} // Slut endGame
// --------------------------------------------------
