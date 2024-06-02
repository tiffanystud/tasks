function init() {
    const newGameBtn = document.getElementById("newGameBtn");
    const newTilesBtn = document.getElementById("newTilesBtn");
    const board = document.getElementById("board");
    const newTiles = document.getElementById("newTiles")
    const message = document.getElementById("message");
    const totPointsElem = document.getElementById("totPoints");
    const countGamesElem = document.getElementById("countGames");

    let totalPoints = 0;
    let countGames = 0;
    let currentTiles = [];
    let usedNumbers = new Set();

    newTilesBtn.disabled = true;

    // Load saved data from localStorage
    function loadGameData() {
        const savedData = localStorage.getItem("gameData");
        if (savedData) {
            const data = savedData.split(",");
            totalPoints = parseInt(data[0], 10);
            countGames = parseInt(data[1], 10);

            if (!isNaN(totalPoints)) {
                totPointsElem.innerHTML = totalPoints;
            }
            if (!isNaN(countGames)) {
                countGamesElem.innerHTML = countGames;
            } else {
                countGames = 0;
                countGamesElem.innerHTML = countGames;
            }
        }
    }

    // Save data to localStorage
    function saveGameData() {
        localStorage.setItem("gameData", totalPoints + "," + countGames);
    }

    // Initialize a new game
    function newGame() {
        // Clear the board
        board.querySelectorAll(".tile").forEach(tile => tile.innerHTML = "");

        // Remove check and cross marks
        board.querySelectorAll(".mark").forEach(mark => mark.classList.remove("check", "cross"));

        // Clear the message
        message.innerHTML = "";

        // Clear used numbers and current tiles
        usedNumbers.clear();
        currentTiles = [];

        // Disable new game button and enable new tiles button
        newGameBtn.disabled = true;
        newTilesBtn.disabled = false;
    }

    // Generate four new tiles
    function generateNewTiles() {
        // Clear the new tiles display
        newTiles.querySelectorAll(".tile").forEach(tile => tile.innerHTML = "");
        currentTiles = [];

        // Generate unique random numbers for the new tiles
        while (currentTiles.length < 4) {
            const randomNum = Math.floor(Math.random() * 40) + 1;
            if (!usedNumbers.has(randomNum)) {
                usedNumbers.add(randomNum);
                currentTiles.push(randomNum);
            }
        }

        // Display the new tiles and make them draggable
        newTiles.querySelectorAll(".tile").forEach((tile, index) => {
            tile.innerHTML = currentTiles[index];
            tile.setAttribute("draggable", true); // Make tile draggable
            tile.addEventListener("dragstart", handleDragStart);
            tile.addEventListener("dragend", handleDragEnd);
        });

        // Disable new tiles button until all new tiles are placed
        newTilesBtn.disabled = true;
    }

    // Event listener for new game button
    newGameBtn.addEventListener("click", () => {
        newGame();
        // Increment game counter
        countGames++;
        saveGameData();
        countGamesElem.innerHTML = countGames;
    });

    // Event listener for new tiles button
    newTilesBtn.addEventListener("click", generateNewTiles);

    // Drag-and-drop functionality
    function handleDragStart(event) {
        if (event.target.innerHTML.trim() === "") {
            event.preventDefault(); // Prevent dragging if the tile is empty
            return;
        }
        // Set the data to be transferred during the drag
        event.dataTransfer.setData("text", event.target.innerHTML);
        // Add a class to the dragged element for styling
        event.target.classList.add("dragging");
    }

    function handleDragOver(event) {
        event.preventDefault();
        // Highlight the drop zone
        if (event.target.classList.contains("tile") && !event.target.innerHTML) {
            event.target.classList.add("hiliteDropZone");
        }
    }

    function handleDragLeave(event) {
        // Remove the highlight from the drop zone
        if (event.target.classList.contains("tile")) {
            event.target.classList.remove("hiliteDropZone");
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        const draggedNumber = event.dataTransfer.getData("text");
        // Drop the tile into an empty spot on the board
        if (event.target.classList.contains("tile") && !event.target.innerHTML) {
            event.target.innerHTML = draggedNumber;
            event.target.classList.remove("hiliteDropZone");
            // Remove number from original tile
            document.querySelector(".dragging").innerText = "";
            document.querySelector(".dragging").classList.remove("dragging");
            // Check if all new tiles have been placed
            if ([...newTiles.querySelectorAll(".tile")].every(tile => !tile.innerHTML)) {
                if (![...board.querySelectorAll(".tile")].every(tile => tile.innerHTML)) {
                    newTilesBtn.disabled = false;
                }
            }
            checkGameCompletion();
        }
    }

    function handleDragEnd(event) {
        // Remove dragging class from the dragged element
        event.target.classList.remove("dragging");
    }

    // Check if the game is complete
    function checkGameCompletion() {
        if ([...board.querySelectorAll(".tile")].every(tile => tile.innerHTML)) {
            checkSeries();
            // Disable new tiles button since the board is full
            newTilesBtn.disabled = true;
            // Enable new game button
            newGameBtn.disabled = false;
            saveGameData();
        }
    }

    // Check rows and columns for increasing series
    function checkSeries() {
        let points = 0;

        // Check rows
        for (let i = 1; i <= 4; i++) {
            const rowTiles = [...board.querySelectorAll(".s" + i + ".tile")];
            if (isIncreasing(rowTiles)) {
                document.querySelector(".mark.s" + i).classList.add("check");
                points++;
            } else {
                document.querySelector(".mark.s" + i).classList.add("cross");
            }
        }

        // Check columns
        for (let i = 5; i <= 8; i++) {
            const colTiles = [...board.querySelectorAll(i + ".tile")];
            if (isIncreasing(colTiles, true)) { // Check in reverse order
                document.querySelector(".mark.s" + i).classList.add("check");
                points++;
            } else {
                document.querySelector(".mark.s" +i).classList.add("cross");
            }
        }

        // Display points for the round
        message.innerHTML = "Poäng denna omgång: " + points;
        // Update total points
        totalPoints += points;
        totPointsElem.innerHTML = totalPoints;
    }

    // Helper function to check if a series is increasing
    function isIncreasing(tiles, reverse = false) {
        if (reverse) tiles = tiles.reverse();
        for (let i = 0; i < tiles.length - 1; i++) {
            const num1 = parseInt(tiles[i].innerHTML, 10);
            const num2 = parseInt(tiles[i + 1].innerHTML, 10);
            if (num1 >= num2) return false;
        }
        return true;
    }

    // Add event listeners for drag-and-drop
    newTiles.querySelectorAll(".tile").forEach(tile => {
        tile.setAttribute("draggable", true); // Ensure tiles are draggable
        tile.addEventListener("dragstart", handleDragStart);
        tile.addEventListener("dragend", handleDragEnd);
    });

    board.querySelectorAll(".tile").forEach(tile => {
        tile.addEventListener("dragover", handleDragOver);
        tile.addEventListener("dragleave", handleDragLeave);
        tile.addEventListener("drop", handleDrop);
    });

    // Load game data on page load
    loadGameData();

    // Ensure new tiles button is disabled initially
    newTilesBtn.disabled = true;
}

window.addEventListener("load", init);
