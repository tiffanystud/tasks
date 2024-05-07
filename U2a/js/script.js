/* Uppgift U2a */

// Globala konstanter och variabler
const roomPrice = [600, 800, 950];		// Pris för rumstyperna
const facilityPrice = [40, 80, 100];    // Pris för tilläggen
let formElem;   // Elementet med hela formuläret (form-elementet)
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare. Lägg till info om pris.
function init() {
	formElem = document.querySelector("#booking");

	for (let i = 0; i < formElem.roomType.length; i++) { /* Gå igenom alla radioknappar för rumstyp */
	
        let priceInfo =  "(" + roomPrice[i] + " kr)";
        // Referera till övre element (label) och inom det, elementet med class ".price"
        formElem.roomType[i].parentElement.querySelector(".price").innerText = priceInfo; // Lägg till prisuppgift
        // Händelsehanterare för radioknapparna
		
	}
	for (let i = 0; i < formElem.facility.length; i++) { /* Gå igenom alla kryssrutor för tillägg */
        let priceInfo = "(" + facilityPrice[i] + " kr)";
        // Referera till övre element (label) och inom det, elementet med class ".price"
        formElem.facility[i].parentElement.querySelector(".price").innerText = priceInfo; // Lägg till prisuppgift
        // Händelsehanterare för kryssrutorna
		
	}
	formElem.nrOfNights.addEventListener("change", calculateCost);
	checkIfFamilyRoom();
	calculateCost();
	// Händelsehanterare för textfält som ska kontrolleras
	
	// Händelsehanterare för kampanjkod
	
} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------
// Beräkna total kostnad för valda alternativ
function calculateCost() {
	
} // Slut calculateCost
// --------------------------------------------------
// Kontrollera om familjerum är valt och ändra tillgänglighet till andra val
function checkIfFamilyRoom() {
	
} // Slut checkIfFamilyRoom
// --------------------------------------------------
// Kontrollera innehållet i de fält som namnges i fieldNames
// Exakt kopia av funktionen i exempel 4-2
function checkField(e, field) {
    
} // Slut checkField
// --------------------------------------------------
// Kontrollera kampanjkoden för varje tecken som skrivs i fältet
function checkCampaign() {
	
} // Slut checkCampaign
// --------------------------------------------------
// Avsluta kontroll av kampanjkod
function endCheckCampaign() {
	
} // Slut endCheckCampaign
// --------------------------------------------------
