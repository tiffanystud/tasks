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

} // Slut init
window.addEventListener("load", init);
// -------------------------------------------------


function newGame() {
    document.querySelector("#stopBtn").disabled = false;


    console.log(newGame);

}
// --------------------------------------------------


function throwOneDie() {
    console.log(throwOneDie);

}
// --------------------------------------------------


function endGame() {
    document.querySelector("#stopBtn").disabled = true;
    console.log(endGame);


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

    playerName = document.querySelector("#player").innerText;
    console.log(playerName);

    maxNrOfRolls = document.querySelector("#nrOfReroll").value;
    console.log(maxNrOfRolls);

}
// --------------------------------------------------
