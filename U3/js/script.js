// Uppgift U3

function init() {
    const newGameBtn = document.getElementById("newGameBtn");
    const newTilesBtn = document.getElementById("newTilesBtn");
    const board = document.getElementById("board");
    const newTiles = document.getElementById("newTiles");
    const message = document.getElementById("message");
    const totPointsElem = document.getElementById("totPoints");
    const countGamesElem = document.getElementById("countGames");

    let totalPoints = 0;
    let countGames = 0;
    let currentTiles = [];
    let usedNumbers = new Set();

    newTilesBtn.disabled = true;

    newGameBtn.addEventListener("click", newGame);
    newTilesBtn.addEventListener("click", newTilesFunc);


    // Händelselyssnare för drag-and-drop
    newTiles.querySelectorAll(".tile").forEach(tile => {
        tile.setAttribute("draggable", true);
        tile.addEventListener("dragstart", dragStartFunc);
        tile.addEventListener("dragend", dragEndFunc);
    });

    board.querySelectorAll(".tile").forEach(tile => {
        tile.addEventListener("dragover", dragOverFunc);
        tile.addEventListener("dragleave", dragLeaveFunc);
        tile.addEventListener("drop", dropFunc);
    });

    // Funktionen för en ny spelomgång
    function newGame() {

        countGames++;
        countGamesElem.innerHTML = countGames;

        // Rensar markering, klasser och numrena
        board.querySelectorAll(".tile").forEach(tile => tile.innerHTML = "");
        board.querySelectorAll(".mark").forEach(mark => mark.classList.remove("check", "cross"));
        usedNumbers.clear();

        message.innerHTML = "";
        currentTiles = [];

        newGameBtn.disabled = true;
        newTilesBtn.disabled = false;
    }

    // Tar fram 4 nya och slumpmässiga tiles
    function newTilesFunc() {

        // Rensar brädet med nya tiles, för varje tile ersätts med ""
        newTiles.querySelectorAll(".tile").forEach(tile => tile.innerHTML = "");
        currentTiles = [];

        // Går igenom 4 tiles och stämmer av så de är unika
        while (currentTiles.length < 4) {
            const randomNum = Math.floor(Math.random() * 40) + 1;
            if (!usedNumbers.has(randomNum)) {
                usedNumbers.add(randomNum);
                currentTiles.push(randomNum);
            }
        }

        // Gör brickorna draggable och sätter händelselyssnare för musen
        newTiles.querySelectorAll(".tile").forEach((tile, i) => {
            tile.innerHTML = currentTiles[i];
            tile.setAttribute("draggable", true); // Make tile draggable
            tile.addEventListener("dragstart", dragStartFunc);
            tile.addEventListener("dragend", dragEndFunc);
        });

        newTilesBtn.disabled = true;
    }

    // Funktion som körs om brädet är fullt och anropar poängräknare
    function isBoardFull() {
        if ([...board.querySelectorAll(".tile")].every(tile => tile.innerHTML)) {
            checkSeries();
            newTilesBtn.disabled = true;
            newGameBtn.disabled = false;
        }
    }

    // Implementerar dragbara element
    function dragStartFunc(e) {
        e.dataTransfer.setData("text", e.target.innerHTML);
        e.target.classList.add("dragging");
    }

    // Bakgrundsfärg på draget element på tomma rutor på brädet
    function dragOverFunc(e) {
        e.preventDefault();
        if (e.target.classList.contains("tile") && !e.target.innerHTML) {
            e.target.classList.add("hiliteDropZone");
        }
    }

    // Tar bort markeringen efter draget element
    function dragLeaveFunc(e) {

        if (e.target.classList.contains("tile")) {
            e.target.classList.remove("hiliteDropZone");
        }
    }

    function dropFunc(e) {
        e.preventDefault();
        const draggedNumber = e.dataTransfer.getData("text");

        // Kontroll så att brickorna intes läpps på en plats med innehåll
        if (e.target.classList.contains("tile") && !e.target.innerHTML) {
            e.target.innerHTML = draggedNumber;
            e.target.classList.remove("hiliteDropZone");

            // Brickbrädet som brickan dras ifrån (m. klass dragging) sätts till ett tomt innehåll
            document.querySelector(".dragging").innerHTML = "";

            // Kontroll om brickbrädet är tomt och omvandlar nodelisten till en array. 
            if ([...newTiles.querySelectorAll(".tile")].every(tile => !tile.innerHTML)) {

                // Varje array element körs mot if-satsen. Kontroll om hela brädet inte har innehåll.
                if (![...board.querySelectorAll(".tile")].every(tile => tile.innerHTML)) {
                    newTilesBtn.disabled = false;
                }
            }

            // Anropas om false returneras, då brädet är fullt.
            isBoardFull();
        }
    }

    // Raderar klassen dragging när elementet släppts
    function dragEndFunc(e) {
        e.target.classList.remove("dragging");
    }

    // Kontroll av stigande serier
    function checkSeries() {
        let points = 0;

        // Raderna (1-4), ej helt funktionell
        for (let i = 1; i <= 4; i++) {
            const rowTiles = [...board.querySelectorAll(".s" + i + ".tile")];
            if (isIncreasing(rowTiles)) {
                document.querySelector(".mark.s" + i).classList.add("check");
                points++;
            } else {
                document.querySelector(".mark.s" + i).classList.add("cross");
            }
        }

        // Kolumnerna (4-8), ej helt funktionell
        for (let i = 5; i <= 8; i++) {
            const colTiles = [...board.querySelectorAll(".s" + i + ".tile")];
            if (isIncreasing(colTiles, true)) {
                document.querySelector(".mark.s" + i).classList.add("check");
                points++;
            } else {
                document.querySelector(".mark.s" + i).classList.add("cross");
            }
        }
        message.innerHTML = points + " poäng totalt!";

        // Totala poängen (som också ska sparas i lokal storage)
        totalPoints += points;
        totPointsElem.innerHTML = totalPoints;
    }

    // Funktionen som säkerställer ökning/minskning i serien
    function isIncreasing(tiles, reverse = false) {
        if (reverse) tiles = tiles.reverse();
        for (let i = 0; i < tiles.length - 1; i++) {
            const num1 = parseInt(tiles[i], 10);
            const num2 = parseInt(tiles[i + 1].innerHTML, 10);
            if (num1 >= num2) return false;
        }
        return true;
    }

}

window.addEventListener("load", init);
