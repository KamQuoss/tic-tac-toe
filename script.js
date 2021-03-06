// TIC-TAC-TOE
// ------ //
// TODO: animacja zwycięzcy
// TODO: wybór gracza początkowego


// defining players, roud counter, arrays of made moves, winnig combinations (data-row and data-col), actual result
let playerX = 'x',
    playerO = 'o',
    round = 1,
    tableX = [],
    tableO = [],
    wininning = [
        ['A1', 'A2', 'A3'],
        ['B1', 'B2', 'B3'],
        ['C1', 'C2', 'C3'],
        ['A1', 'B1', 'C1'],
        ['A2', 'B2', 'C2'],
        ['A3', 'B3', 'C3'],
        ['A3', 'B2', 'C1'],
        ['A1', 'B2', 'C3']
    ],
    result = false;

// adding boxes to board
const board = document.querySelectorAll('.box');

// comunication
let alert = document.querySelector('.alert-container');
const writeTurn = (turn) => {
    let whosTurn = `Postaw ${turn}`;
    alert.innerHTML = whosTurn;
};
const whoWins = (turn) => {
    if (!turn) alert.innerHTML = 'Remis';
    else {
        let winner = `Wygrywa ${turn}`;
        alert.innerHTML = winner;
    }
};

writeTurn(playerO);

// clearing board
const cleanBoard = () => {
    board.forEach(box => box.innerText = '');
    tableX = [];
    tableO = [];
    result = false;
    round = 1;
    writeTurn(playerO);
    board.forEach(box => box.addEventListener('click', addSign));
}
// adding move to table of moves
const addMove = (move, table) => table.push(move);

const checkWinner = (tablePlayer) => {
    wininning.forEach(combination => {
        if (result == true) return;
        result = combination.every(comb => tablePlayer.includes(comb));
    })
}

//dodawanie znaku
const addSign = event => {
    if (round <= 9) {
        // coordinates of clicked box
        let coordinate = `${event.target.dataset.row}${event.target.dataset.col}`;
        // check if box is full & block to box change 
        if (tableX.includes(coordinate) || tableO.includes(coordinate)) return;
        // player x or o?
        if (round % 2 === 0) {
            event.target.innerText = playerX;
            addMove(coordinate, tableX);
            checkWinner(tableX);
            writeTurn(playerO);
            if (result == true) {
                whoWins(playerX);
                console.log(`wygrywa ${playerX}`)
                //block clicking boxes
                board.forEach(box => box.removeEventListener('click', addSign));
                setTimeout(cleanBoard, 2000)
            };
        } else {
            event.target.innerText = playerO;
            addMove(coordinate, tableO);
            checkWinner(tableO);
            writeTurn(playerX);
            if (result == true) {
                whoWins(playerO);
                //block clicking boxes
                board.forEach(box => box.removeEventListener('click', addSign));
                setTimeout(cleanBoard, 2000)
            };
        };
        // case remis
        if (round == 9 && result == false) {
            whoWins();
            board.forEach(box => box.removeEventListener('click', addSign));
            setTimeout(cleanBoard, 2000)
        }
        //another round        
        round++;
    } else return;
}
board.forEach(box => box.addEventListener('click', addSign));