/* Uppgift U1 */

// Globala variabler
let optionsDialog;	    // Element för inställningsdialog
let rollElem;           // Element för utskrift av antal omkast som återstår
let resElem;	        // Element för resultat
let stopBtn;            // Knapp för att stanna
let playerName = "Du";  // Spelarens namn
let maxNrOfRolls = 3;   // Valt max antal omkast av tärningar
let nrOfRolls = 0;      // Antal omkast som återstår
let sum = 0;            // Summan av kastade tärningar
let lowestPoint = 18;
// --------------------------------------------------
// Ta fram referenser till element i gränssnittet och lägg till händelselyssnare.
function init() {
    document.querySelector("#optionsBtn").addEventListener("click", showOptionsDialog);
    document.querySelector("#optionsOkBtn").addEventListener("click", closeOptionsDialog);
    document.querySelector("#newBtn").addEventListener("click", newGame); //1
    document.querySelector("#stopBtn").addEventListener("click", endGame);

    document.querySelector("#die1").addEventListener("click", throwOneDie);
    document.querySelector("#die2").addEventListener("click", throwOneDie);
    document.querySelector("#die3").addEventListener("click", throwOneDie);
    document.querySelector("#die4").addEventListener("click", throwOneDie);
    document.querySelector("#die5").addEventListener("click", throwOneDie);

    document.querySelector("#stopBtn").disabled = true;

    resElem = document.querySelector("#result");
    stopBtn = document.querySelector("#stopBtn");
    rollElem = document.querySelector("#rollCounter");
    optionsDialog = document.querySelector("#options");
    maxNrOfRolls = document.querySelector("#nrOfReroll").value;
} // Slut init
window.addEventListener("load", init);
// -------------------------------------------------
// Starta nytt spel och anropa throwDiceNewGame för ett inledande kast av alla tärningar.
function newGame() {
    nrOfRolls = maxNrOfRolls;

    // --------------------------------------------------
    sum = throwDiceNewGame("die1");
    sum += throwDiceNewGame("die2");
    sum += throwDiceNewGame("die3");
    sum += throwDiceNewGame("die4");
    sum += throwDiceNewGame("die5");


    rollElem.innerHTML = nrOfRolls;
    resElem.innerHTML = sum;
    console.log(sum + " sum 'throwAllDice'");
    // --------------------------------------------------

    document.querySelector("#stopBtn").disabled = false;


    rollElem.innerHTML = nrOfRolls;
    console.log("i 'newGame' funktionen")

}
// --------------------------------------------------
// Kast av alla tärningar, anrop av throwOneDie per tärning.
function throwDiceNewGame(id) {
    // --------------------------------------------------
    let dieElem = document.querySelector("#" + id);
    dieElem.classList.toggle("rotateDie");
    let dieValue = Math.floor(6 * Math.random()) + 1;
    dieElem.src = "img/dice/" + dieValue + ".png";

    dieElem.alt = dieValue;
    rollElem.innerHTML = nrOfRolls;

    console.log("i 'throwDiceNewGame' funktionen")

  
    console.log("i 'throwDiceNewGame' innan 'return' funktionen")

    return dieValue;
    // --------------------------------------------------


}
// --------------------------------------------------
//Kasta en tärning occh byt bild beroende på värdet.
function throwOneDie() {
    // --------------------------------------------------
    if (nrOfRolls == 0) {
        return;
    }

    sum = sum - this.alt;

    sum += throwDiceNewGame(this.id);
    nrOfRolls--;

    rollElem.innerHTML = nrOfRolls;
    resElem.innerText = sum;

    if (nrOfRolls == 0) {
        endGame();
    }

    // --------------------------------------------------
    console.log("i 'throwOneDie' funktionen")

}
// --------------------------------------------------

// Avsluta spelet
function endGame() {
    document.querySelector("#stopBtn").disabled = true;
    console.log(endGame);

    let endSum = sum - 18;

    if (endSum < 0 || endSum > 3) {
        endSum = 0;
    }

    resElem.innerHTML = playerName + " fick totalt " + sum + " vilket ger dig: " + endSum + " poäng."

    console.log("i 'endGame' funktionen")

}
// --------------------------------------------------

function showOptionsDialog() {
    optionsDialog.showModal();

    console.log(showOptionsDialog);
}
// --------------------------------------------------

function closeOptionsDialog() {
    optionsDialog.close();

    console.log(closeOptionsDialog);

    playerName = document.querySelector("#player").value;
    console.log(playerName);

    maxNrOfRolls = document.querySelector("#nrOfReroll").value;
    console.log(maxNrOfRolls);

}
// --------------------------------------------------