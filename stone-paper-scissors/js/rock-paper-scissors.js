let playerMove = "";
let computerMove = "";
let result = "";
let activeButton = "";
let autoPlayEnabled = false;
let intervalId;
const moves = {
  Rock: { beats: "Scissors", isTie: (move) => move === "Rock" },
  Paper: { beats: "Rock", isTie: (move) => move === "Paper" },
  Scissors: { beats: "Paper", isTie: (move) => move === "Scissors" },
};

const buttons = {
  Rock: document.getElementById("rock"),
  Paper: document.getElementById("paper"),
  Scissors: document.getElementById("scissors"),
};

const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  tie: 0,
};


function autoPlay() {
  if (!autoPlayEnabled) {
    intervalId = setInterval( () => {
      playRound(getComputerMove());
    }, 1000);
    autoPlayEnabled = true;
  }else{
    clearInterval(intervalId);
    autoPlayEnabled = false;
  }
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.tie = 0;
  updateScore();
  storeLocally();
  for (const move in buttons) {
    buttons[move].classList.remove("active");
  }
  displayResult(true);
}
updateScore();
function getComputerMove() {
  const keys = Object.keys(moves);
  return keys[Math.floor(Math.random() * keys.length)];
}

function playRound(playerMove) {
  if (activeButton) {
    activeButton.classList.remove("active");
  }
  activeButton = buttons[playerMove];

  activeButton.classList.add("active");
  this.playerMove = playerMove;
  computerMove = getComputerMove();
  const playerMoveData = moves[playerMove];

  if (playerMoveData.isTie(computerMove)) {
    result = "Tie";
    score.tie++;
  } else if (computerMove === playerMoveData.beats) {
    result = "You Win";
    score.wins++;
  } else {
    result = "You Lose";
    score.losses++;
  }
  storeLocally();
  updateScore();
  displayResult(false);
}

function displayResult(isReset) {
  const resultElement = document.getElementById("result");

  if (isReset) {
    resultElement.innerHTML = "";
    document.getElementById("moves").innerHTML = "";
    return;
  }

  resultElement.innerHTML = ` ${result} `;
  document.getElementById("moves").innerHTML = `
    You
    <img src="./images/${this.playerMove}.png" alt=${this.playerMove} class="move-icon">
    <img src="./images/${computerMove}.png" alt=${computerMove} class="move-icon">
    Computer
`;
}

function storeLocally() {
  localStorage.setItem("score", JSON.stringify(score));
}

function updateScore() {
  document.getElementById(
    "score"
  ).innerHTML = `Wins: ${score.wins}  Losses: ${score.losses}  Ties: ${score.tie}`;
}

for (const move in buttons) {
  playerMove = move;
  buttons[move].addEventListener("click", () => playRound(move));
}

document.getElementById("reset").addEventListener("click", resetScore);
document.getElementById("auto-play").addEventListener("click", autoPlay);
