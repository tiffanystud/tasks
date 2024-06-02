/* Uppgift U2a */

// Globala konstanter och variabler
const roomPrice = [600, 800, 950];       // Pris för rumstyperna
const facilityPrice = [40, 80, 100];     // Pris för tilläggen
let formElem;                            // Elementet med hela formuläret (form-elementet)

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare. Lägg till info om pris 
function init() {
    formElem = document.querySelector("#booking");

    for (let i = 0; i < formElem.roomType.length; i++) { // Gå igenom alla radioknappar för rumstyp
        let priceInfo =  "(" + roomPrice[i] + " kr)";
        // Referera till övre element (label) och inom det, elementet med class ".price"
        formElem.roomType[i].parentElement.querySelector(".price").innerText = priceInfo; // Lägg till prisuppgift
        // Händelsehanterare för radioknapparna
        formElem.roomType[i].addEventListener("change", () => {
            calculateCost();
            checkIfFamilyRoom();
        });
    }

    for (let i = 0; i < formElem.facility.length; i++) { // Gå igenom alla kryssrutor för tillägg
        let priceInfo = "(" + facilityPrice[i] + " kr)";
        // Referera till övre element (label) och inom det, elementet med class ".price"
        formElem.facility[i].parentElement.querySelector(".price").innerText = priceInfo; // Lägg till prisuppgift
        // Händelsehanterare för kryssrutorna
        formElem.facility[i].addEventListener("change", calculateCost);
    }

    formElem.nrOfNights.addEventListener("change", calculateCost);
    checkIfFamilyRoom();
    calculateCost();

    // Händelsehanterare för textfält som ska kontrolleras
    formElem.zipcode.addEventListener('blur', (e) => checkField(e, formElem.zipcode));
    formElem.telephone.addEventListener('blur', (e) => checkField(e, formElem.telephone));

    // Händelsehanterare för kampanjkod
    formElem.campaigncode.addEventListener('focus', checkCampaign);
    formElem.campaigncode.addEventListener('keyup', checkCampaign);
    formElem.campaigncode.addEventListener('blur', endCheckCampaign);
}// Slut init
window.addEventListener("load", init);
// --------------------------------------------------
// Beräkna total kostnad för valda alternativ
function calculateCost() {
    let totalCost = 0; // stayCost
    let familyRoomSelected = false;

    for (let i = 0; i < formElem.roomType.length; i++) {
        if (formElem.roomType[i].checked) {
            totalCost += roomPrice[i];
            if (formElem.roomType[i].value === "familj") {
                familyRoomSelected = true;
            }
        }
    }

    for (let i = 0; i < formElem.facility.length; i++) {
        if (formElem.facility[i].checked) {
            if (!(familyRoomSelected && formElem.facility[i].value === "sjöutsikt")) {
                totalCost += facilityPrice[i];
            }
        }
    }

    totalCost *= parseInt(formElem.nrOfNights.value);
    document.getElementById("totalCost").textContent = totalCost + " kr";
}// Slut calculateCost
// --------------------------------------------------
// Kontrollera om familjerum är valt och ändra tillgänglighet till andra val
function checkIfFamilyRoom() {
    const familyRoomSelected = document.querySelector('input[name="roomType"][value="familj"]').checked;
    const personsMenu = document.querySelector('select[name="persons"]');
    const lakeViewCheckbox = document.querySelector('input[name="facility"][value="sjöutsikt"]');

    if (familyRoomSelected) {
        personsMenu.disabled = false;
        lakeViewCheckbox.checked = false;
        lakeViewCheckbox.disabled = true;
    } else {
        personsMenu.disabled = true;
        lakeViewCheckbox.disabled = false;
    }
}// Slut checkIfFamilyRoom
// --------------------------------------------------
// Kontrollera innehållet i de fält som namnges i fieldNames
// Exakt kopia av funktionen i exempel 4-2
function checkField(e, field) {
    let regex;
    if (field.name === "zipcode") {
        regex = /^[0-9]{5}$/;
    } else if (field.name === "telephone") {
        regex = /^[0-9]{10}$/;
    }

    const errorMsg = field.nextElementSibling;
    if (regex.test(field.value.trim())) {
        errorMsg.textContent = "";
    } else {
        errorMsg.textContent = "Felaktigt format";
    }
}// Slut checkField
// --------------------------------------------------
// Kontrollera kampanjkoden för varje tecken som skrivs i fältet
function checkCampaign() {
    const campaignField = this;
    const value = campaignField.value.trim();
    const regex = /^[a-zA-Z]{3}-[0-9]{2}-[a-zA-Z][0-9]$/;

    if (regex.test(value)) {
        campaignField.style.backgroundColor = "#6F9";
    } else {
        campaignField.style.backgroundColor = "#F99";
    }
}// Slut checkCampaign
// --------------------------------------------------
// Avsluta kontroll av kampanjkod
function endCheckCampaign() {
    const campaignField = this;
    campaignField.style.backgroundColor = "";
    campaignField.value = campaignField.value.toUpperCase();
} // Slut endCheckCampaign
// --------------------------------------------------