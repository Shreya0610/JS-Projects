const message = document.querySelector(".container>p");
let boxes = document.querySelectorAll(".col");
let resetBtn = document.querySelector(".btn");
let players = ["X", "O"];
let currentPlayer = players[Math.floor(Math.random() * players.length)];
let game = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let noOfChances = 1;

message.innerText = "Current Player : " + currentPlayer;
boxes.forEach(function addEventListenertoBoxes(box) {
  box.addEventListener("click", function boxClickHandler(event) {
    event.target.innerText = currentPlayer;
    const { x, y } = event.target.dataset;
    game[x][y] = currentPlayer;
    let winner = getWinner();

    if (currentPlayer == "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
    console.log(winner);

    if (winner == null) {
      message.innerText = "Next Player : " + currentPlayer;
    } else if (winner == "draw") {
      message.innerText = "Game Draw. (Restarting in 5 sec)";
    } else {
      message.innerText = "Winner : " + winner + " (Restarting in 5 sec)";
    }
    noOfChances++;
  });
});

resetBtn.addEventListener("click", function resetBtnClickHandler() {
  boxes.forEach(function resetBox(box) {
    box.innerText = "";
    currentPlayer = players[Math.floor(Math.random() * players.length)];
    message.innerText = "Current Player : " + currentPlayer;
    game = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    noOfChances = 1;
  });
});

function getWinner() {
  if (noOfChances < 5) {
    return null;
  }
  let winnerByRow = getWinnerByRow();
  if (winnerByRow != null) {
    return winnerByRow;
  }
  let winnerByCols = getWinnerByCols();
  if (winnerByCols != null) {
    return winnerByCols;
  }
  let winnerByDiagonal = getWinnerByDiagonal();
  if (winnerByDiagonal != null) {
    return winnerByDiagonal;
  }
  if (noOfChances == 9) {
    return "draw";
  }
  return null;
}

function getWinnerByRow() {
  for (let i = 0; i <= 2; i++) {
    if (
      game[i][0] != "" &&
      game[i][0] == game[i][1] &&
      game[i][0] == game[i][2]
    ) {
      return game[i][0];
    }
  }
  return null;
}
function getWinnerByCols() {
  for (let i = 0; i <= 2; i++) {
    if (
      game[0][i] != "" &&
      game[0][i] == game[1][i] &&
      game[0][i] == game[2][i]
    ) {
      return game[0][i];
    }
  }
  return null;
}
function getWinnerByDiagonal() {
  if (
    game[0][0] != "" &&
    game[0][0] == game[1][1] &&
    game[0][0] == game[2][2]
  ) {
    return game[0][0];
  } else if (
    game[0][2] != "" &&
    game[0][2] == game[1][1] &&
    game[0][2] == game[2][0]
  ) {
    return game[0][2];
  } else {
    return null;
  }
}
