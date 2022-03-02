const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const results = document.querySelector(".result");
const user_score = document.querySelector(".user-score");
const comp_score = document.querySelector(".comp-score");
const time = document.querySelector(".time");
const input = document.querySelector("input");
let timer = document.getElementById("timer");
const playBtn = document.querySelector(".play");
const resetBtn = document.querySelector(".reset");
const resetMessage = document.querySelector(".time-reset");

const array = ["rock", "paper", "scissors"];

let user_choice = "";
let comp_choice = "";
let user_count = 0;
let comp_count = 0;
let isPlaying = false;
let timeLeft = timer.value;
let countdown;

// Add event listener to rock paper and scissors button
rock.addEventListener("click", () => {
  comp_choice = random();
  user_choice = array[0];
  // color()
  result();
});

paper.addEventListener("click", () => {
  comp_choice = random();
  user_choice = array[1];
  // color()
  result();
});

scissors.addEventListener("click", () => {
  comp_choice = random();
  user_choice = array[2];
  // color()
  result();
});

// for the time feature
function getTime() {
  countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      isPlaying = false;
      playBtn.innerHTML = `<i class="fa fa-play"></i>`;
    }
    isPlaying = true;
    time.innerText =
      timeLeft === 0
        ? `Time Up!`
        : timeLeft < 10
        ? `00:0${timeLeft}`
        : `00:${timeLeft}`;
    timeLeft -= 1;

    let value = time.innerText;
    if (value === "Time Up!") {
      if (user_count > comp_count) {
        time.innerText = `Time up You Won!`;
        time.style.color = `#4dcc2d`;
      } else if (user_count === comp_count) {
        time.innerText = "Time up it's a draw!";
      } else {
        time.innerText = `Time up computer won!`;
        time.style.color = "#fc121b";
      }
      resetMessage.innerText = `Press reset button to start again`;
      rock.disabled = true;
      paper.disabled = true;
      scissors.disabled = true;
    }
  }, 1000);
}

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);

function play() {
  if (!isPlaying) {
    reset(); // reset first
    getTime(); // start time
    playBtn.innerHTML = `<i class="fa fa-pause"></i>`;
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;
  } else {
    clearInterval(countdown);
    playBtn.innerHTML = `<i class="fa fa-play"></i>`;
    isPlaying = false;

    rock.disabled = true;
    paper.disabled = true;
    scissors.disabled = true;
  }
}

function reset() {
  rock.disabled = false;
  paper.disabled = false;
  scissors.disabled = false;
  user_count = 0;
  comp_count = 0;
  user_score.innerText = user_count;
  comp_score.innerText = comp_count;
  time.innerText = "";
  resetMessage.innerText = "";
  timeLeft = timer.value;

  if (isPlaying) {
    clearInterval(countdown);
  }
}

function random() {
  return array[Math.floor(Math.random() * array.length)];
}

function win() {
  user_count++;
  user_score.innerHTML = user_count;
  let element = document.getElementById(user_choice);
  element.classList.add("green-glow");
  setTimeout(() => element.classList.remove("green-glow"), 1000);
}

function lose() {
  comp_count++;
  comp_score.innerHTML = comp_count;
  let element = document.getElementById(user_choice);
  element.classList.add("red-glow");
  setTimeout(() => element.classList.remove("red-glow"), 1000);
}

function draw() {
  let element = document.getElementById(user_choice);
  element.classList.add("grey-glow");
  setTimeout(() => element.classList.remove("grey-glow"), 1000);
}

function result() {
  const userSmall = `<sup>user</sup>`;
  const compSmall = `<sup>comp</sup>`;
  if (user_choice === "paper" && comp_choice === "rock") {
    results.innerHTML = `${user_choice}${userSmall} covers  ${comp_choice}${compSmall}. You win!`;
    win();
  } else if (user_choice === "paper" && comp_choice === "scissors") {
    results.innerHTML = `${comp_choice}${compSmall} cuts  ${user_choice}${userSmall}.  Sorry You Lose!`;
    lose();
  }

  if (user_choice === "rock" && comp_choice === "paper") {
    results.innerHTML = `${comp_choice}${compSmall} covers  ${user_choice}${userSmall}. Sorry You Lose!`;
    lose();
  } else if (user_choice === "rock" && comp_choice === "scissors") {
    results.innerHTML = `${user_choice}${userSmall} crushes  ${comp_choice}${compSmall}. You win!`;
    win();
  }

  if (user_choice === "scissors" && comp_choice === "paper") {
    results.innerHTML = `${user_choice}${userSmall} cuts  ${comp_choice}${compSmall}. You win!`;
    win();
  } else if (user_choice === "scissors" && comp_choice === "rock") {
    results.innerHTML = `${comp_choice}${compSmall} crushes  ${user_choice}${userSmall}. Sorry You Lose!`;
    lose();
  }

  if (user_choice === comp_choice) {
    results.innerHTML = `${user_choice}${userSmall} is equal to ${comp_choice}${compSmall}. Draw!`;
    draw();
  }
}
