const startGameBtn = document.getElementById('start-game-btn');

// create constants to avoid typos in code! Good Practice!
const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

// Make sure you can't start another game when the first one is ongoing
let gameIsRunning = false;

// prompt the user for their input
const getPlayerChoice = function () {
	// smart to use a template literal
	const selection = prompt(
		`${ROCK}, ${PAPER} or ${SCISSORS}?`,
		''
	).toUpperCase();

	// smart to check the negative case first
	if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
		alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
		return DEFAULT_USER_CHOICE;
	}
	return selection;
};

const getComputerChoice = function () {
	const randomValue = Math.random();
	if (randomValue < 0.34) {
		return ROCK;
	} else if (randomValue < 0.67) {
		return PAPER;
	} else {
		return SCISSORS;
	}
};

const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) => {
	return cChoice === pChoice
		? RESULT_DRAW
		: (cChoice === ROCK && pChoice === PAPER) ||
		  (cChoice === PAPER && pChoice === SCISSORS) ||
		  (cChoice === SCISSORS && pChoice === ROCK)
		? RESULT_PLAYER_WINS
		: RESULT_COMPUTER_WINS;

	console.log('COMPUTER CHOICE: ', cChoice);
	console.log('PLAYER CHOICE: ', pChoice);
	if (cChoice === pChoice) {
		return RESULT_DRAW;
	} else if (
		(cChoice === ROCK && pChoice === PAPER) ||
		(cChoice === PAPER && pChoice === SCISSORS) ||
		(cChoice === SCISSORS && pChoice === ROCK)
	) {
		return RESULT_PLAYER_WINS;
	} else {
		return RESULT_COMPUTER_WINS;
	}
};

startGameBtn.addEventListener('click', function () {
	//This will make sure a new game isn't started if you repress start
	if (gameIsRunning) {
		return;
	}

	gameIsRunning = true;
	console.log('Game is starting...');
	const playerSelection = getPlayerChoice();
	const computerChoice = getComputerChoice();
	let winner;

	// what if the user doesn't enter a value
	if (playerSelection) {
		winner = getWinner(computerChoice, playerSelection);
	} else {
		// JS is forgiving, you don't get an error for passing 1 argument only
		// it passed the other arg as undefined
		winner = getWinner(computerChoice);
	}
	let message = `You picked ${
		playerSelection ? playerSelection : DEFAULT_USER_CHOICE
	}, computer picked ${computerChoice}, therefore you `;
	if (winner === RESULT_DRAW) {
		message = message + 'drew the game.';
	} else if (winner === RESULT_PLAYER_WINS) {
		message = message + 'won!';
	} else {
		message = message + 'lost.';
	}
	alert(message);

	// new game is ALLOWED to be started because of this code line
	gameIsRunning = false;
	console.log(winner);
});

// function that takes any number of args
const sumUp = (resultHandler, ...numbers) => {
	const validateNumber = (number) => {
		return isNaN(number) ? 0 : number;
	};
	let sum = 0;
	for (const num of numbers) {
		sum += validateNumber(num);
	}
	resultHandler(sum);
};

const showResult = (result) => {
	alert(`The result is ${result}`);
};

console.log(sumUp(showResult, 1, 2, 3, 4, 5));
