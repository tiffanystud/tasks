/* Uppgift U3 */

let newGameBtn;
let newTilesBtn;
let board;
let newTiles;
let message;
let totPointsElem;
let countGamesElem;

let totalPoints = 0;
let countGames = 0;
let currentTiles = [];
let usedNumbers = new Set();

function init() {
    newGameBtn = document.getElementById("newGameBtn");
    const newTilesBtn = document.getElementById("newTilesBtn");
    board = document.getElementById("board");
    newTiles = document.getElementById("newTiles");
    message = document.getElementById("message");
    totPointsElem = document.getElementById("totPoints");
    countGamesElem = document.getElementById("countGames");

    loadGameData();
    newTilesBtn.disabled = true;

    newTilesBtn.addEventListener("click", generateNewTiles);
    newGameBtn.addEventListener("click", () => {
        newGame();
        countGames++;
        saveGameData();
        countGamesElem.innerHTML = countGames;
    });
    // --------------------------------------------------
    // Läs in ev. sparad data
    function loadGameData() {
        const savedData = localStorage.getItem("gameData");
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                totalPoints = data.totalPoints || 0;
                countGames = data.countGames || 0;

                totPointsElem.innerHTML = totalPoints;
                countGamesElem.innerHTML = countGames;
            } catch (e) {
                console.error("Failed to parse saved game data:", e);
                totalPoints = 0;
                countGames = 0;
            }
        }
    }
    // --------------------------------------------------
    // Rensa brädet, meddelanden och markörer
    function newGame() {

        board.querySelectorAll(".tile").forEach(tile => tile.innerHTML = "");
        board.querySelectorAll(".mark").forEach(mark => mark.classList.remove("check", "cross"));

        message.innerHTML = "";
        usedNumbers.clear();
        currentTiles = [];

        newGameBtn.disabled = true;
        newTilesBtn.disabled = false;
    }
    // --------------------------------------------------
    //Funktion för skapande av 4 nya brickor och drag and drop
    function generateNewTiles() {
        newTiles.querySelectorAll(".tile").forEach(tile => tile.innerHTML = "");
        currentTiles = [];

        // Välj ut slumpmässiga brickor
        while (currentTiles.length < 4) {
            const randomNum = Math.floor(Math.random() * 40) + 1;
            if (!usedNumbers.has(randomNum)) {
                usedNumbers.add(randomNum);
                currentTiles.push(randomNum);
            }
        }

        //Tillämpa drag and drop funktion
        newTiles.querySelectorAll(".tile").forEach(tile => {
            tile.setAttribute("draggable", true);
            tile.addEventListener("dragstart", handleDragStart);
            tile.addEventListener("dragend", handleDragEnd);
        });

        board.querySelectorAll(".tile").forEach(tile => {
            tile.addEventListener("dragover", handleDragOver);
            tile.addEventListener("dragleave", handleDragLeave);
            tile.addEventListener("drop", handleDrop);
        });

        // Gör de nya brickorna draggable
        newTiles.querySelectorAll(".tile").forEach((tile, index) => {
            tile.innerHTML = currentTiles[index];
            tile.setAttribute("draggable", true);
            tile.addEventListener("dragstart", handleDragStart);
            tile.addEventListener("dragend", handleDragEnd);
        });

        // Inaktiv knapp så länge det finns brickor att placera
        newTilesBtn.disabled = true;
    }
    // --------------------------------------------------
    // Funktion som konrollerar drag and drop
    function handleDragStart(e) {
        if (e.target.innerHTML.trim() === "") {
            e.preventDefault();
            return;
        }

        // Data som ska överföras under drag and drop
        e.dataTransfer.setData("text", e.target.innerHTML);
        e.target.classList.add("dragging");
    }
    // --------------------------------------------------
    // Funktioner som implementerar bakgrundsfärg under dragOver 
    function handleDragOver(e) {
        e.preventDefault();
        if (e.target.classList.contains("tile") && !e.target.innerHTML) {
            e.target.classList.add("hiliteDropZone");
        }
    }
    // --------------------------------------------------
    // Funktion som tar bort bakgrundsfärgen
    function handleDragLeave(e) {
        if (e.target.classList.contains("tile")) {
            e.target.classList.remove("hiliteDropZone");
        }
    }
    // --------------------------------------------------
    // Funktion som överför data vid släppt brickca på tom ruta
    function handleDrop(e) {
        e.preventDefault();
        const draggedNumber = e.dataTransfer.getData("text");
        // Kontroll av tomma brickor på brädet
        if (e.target.classList.contains("tile") && !e.target.innerHTML) {
            e.target.innerHTML = draggedNumber;
            e.target.classList.remove("hiliteDropZone");

            document.querySelector(".dragging").innerHTML = "";
            document.querySelector(".dragging").classList.remove("dragging");


            if ([...newTiles.querySelectorAll(".tile")].every(tile => !tile.innerHTML)) {
                if (![...board.querySelectorAll(".tile")].every(tile => tile.innerHTML)) {
                    newTilesBtn.disabled = false;
                }
            }
            checkGameCompletion();
        }
    }
    // --------------------------------------------------
    // Ta bort dragging-class
    function handleDragEnd(e) {
        e.target.classList.remove("dragging");
    }
    // --------------------------------------------------
    // Funktion som konrollerar om brädet är fullt
    function checkGameCompletion() {
        if ([...board.querySelectorAll(".tile")].every(tile => tile.innerHTML)) {
            checkSeries();

            // Om brädet är fullt inaktiveras knappen
            newTilesBtn.disabled = true;
            newGameBtn.disabled = false;

            saveGameData();
        }
    }
    // --------------------------------------------------
    // Funktion för kontroll av stigande serier
    function checkSeries() {
        let points = 0;

        //Kontroll av stigande serier på raderna
        for (let i = 1; i <= 4; i++) {
            const rowTiles = [...board.querySelectorAll(".s" + i + ".tile")];
            if (isIncreasing(rowTiles)) {
                document.querySelector(".mark.s" + i).classList.add("check");
                points++;
            } else {
                document.querySelector(".mark.s" + i).classList.add("cross");
            }
        }

        // Kontroll av stigande serier i kolumnerna
        for (let i = 5; i <= 8; i++) {
            const colTiles = [...board.querySelectorAll(".s" + i + ".tile")];
            if (isIncreasing(colTiles, true)) {
                document.querySelector(".mark.s" + i).classList.add("check");
                points++;
            } else {
                document.querySelector(".mark.s" + i).classList.add("cross");
            }
        }


        message.innerHTML = "Poäng denna omgång: " + points;

        totalPoints += points;
        totPointsElem.innerHTML = totalPoints;
    }
    // --------------------------------------------------
    // Kontroll av stigande serie
    function isIncreasing(tiles, reverse = false) {
        if (reverse) tiles = tiles.reverse();
        for (let i = 0; i < tiles.length - 1; i++) {
            const num1 = parseInt(tiles[i].innerHTML, 10);
            const num2 = parseInt(tiles[i + 1].innerHTML, 10);
            if (num1 >= num2) return false;
        }
        return true;
    }
    // --------------------------------------------------
    // Spara ner till local storage
    function saveGameData() {
        const data = {
            totalPoints: totalPoints,
            countGames: countGames
        };
        localStorage.setItem("gameData", JSON.stringify(data));
    }
    // --------------------------------------------------
}
// --------------------------------------------------
window.addEventListener("load", init);