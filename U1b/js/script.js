/* Uppgift U1b */

// Globala konstanter och variabler
const wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANT", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD", "DATORSPEL", "WEBBPLATS", "TELEFON", "STJÄRNA", "KANELBULLE", "SEMLA", "ÄPPELPAJ", "BLÅBÄR", "LINGONSYLT", "TRAKTOR", "CYKELKEDJA", "BOKHYLLA", "BOKSTAV", "GRILLPLATS", "SOLSTOL", "BADPLATS", "SNÖGUBBE", "PARAPLY"];
let randomWord;
let startBtn;
let letterButtons;
let hangmanImg;
let hangmanNr;
let msgElem;
let startTime;

// --------------------------------------------------
// Initiering då webbsidan laddats in
function init() {
    startBtn = document.querySelector("#startBtn");
    letterButtons = document.querySelectorAll("#letterButtons button");
    hangmanImg = document.querySelector("#hangman");
    msgElem = document.querySelector("#message");
    
    startBtn.addEventListener("click", startGame);
    letterButtons.forEach(button => {
        button.addEventListener("click", guessLetter);
    });

    startBtn.disabled = false;
    letterButtons.forEach(button => {
        button.disabled = true;
    });
} // Slut init
window.addEventListener("load", init);

// --------------------------------------------------
// Initiera ett nytt spel. Visa första bilden (h0.png),
// sätt bildnummer till 0, inaktivera startknapp och aktivera bokstavsknappar.
function startGame() {
    hangmanImg.src = "img/h0.png";
    hangmanNr = 0;

    startBtn.disabled = true;
    letterButtons.forEach(button => {
        button.disabled = false;
    });

    msgElem.textContent = "";

    selectRandomWord();
} // Slut startGame

// --------------------------------------------------
// Ett ord väljs slumpmässigt. Visa en ruta för varje bokstav i ordet
function selectRandomWord() {
    randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    const letterBoxesContainer = document.getElementById("letterBoxes");
    letterBoxesContainer.innerHTML = ""; // Töm tidigare rutor

    for (let i = 0; i < randomWord.length; i++) {
        const box = document.createElement("span");
        box.className = "letterBox";
        letterBoxesContainer.appendChild(box);
    }
} // selectRandomWord

// --------------------------------------------------
// Kontrollera om bokstaven finns i ordet och skriv i så fall ut den.
// Om bokstaven ej finns, uppdateras bilden med galgen och gubben
// Om alla bokstäver är gissade eller om den sista bilden visades, avslutas spelet
function guessLetter(e) {
    const selectedLetter = e.target.value;
    e.target.disabled = true;

    const boxElems = document.querySelectorAll("#letterBoxes span");

    let correctGuess = false;
    
    for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === selectedLetter) {
            boxElems[i].textContent = selectedLetter;
            correctGuess = true;
        }
    }

    if (!correctGuess) {
        hangmanNr++;
        hangmanImg.src = "img/h" + hangmanNr + ".png";
        if (hangmanNr === 6) {
            endGame(true);
            return;
        }
    }

    let allLettersFound = true;
    for (let i = 0; i < randomWord.length; i++) {
        if (!boxElems[i].textContent) {
            allLettersFound = false;
            break;
        }
    }

    if (allLettersFound) {
        endGame(false);
    }
} // Slut guessLetter

// --------------------------------------------------
// Avsluta spelet genom att skriva ut ett meddelande och
// sedan aktivera startknappen och inaktivera bokstavsknapparna
function endGame(manHanged) {
    if (manHanged) {
        msgElem.textContent = "Gubben blev hängd! Ordet var: " + randomWord;
    } else {
        msgElem.textContent = "Grattis! Du gissade rätt ord!";
    }

    startBtn.disabled = false;
    letterButtons.forEach(button => {
        button.disabled = true;
    })
}