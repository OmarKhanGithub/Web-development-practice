// HARD CODED GLOBAL VALUES
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 10;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let chosenMaxLife;

try {
	chosenMaxLife = getMaxLifeValues();
} catch (error) {
	console.log(error);
	chosenMaxLife = 100;
	alert('BAD VALUE ENTERED: 100 used instead!');
} finally {
    // close resource
    // cleanup 
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

function getMaxLifeValues() {
	const enteredVal = prompt('Enter starting health amount: ', '100');

	// Possibly changed mutable values
	const parsedValue = parseInt(enteredVal);

	if (isNaN(parsedValue) || parsedValue <= 0) {
		throw { message: 'Invalid user input, not a number!' };
	}
	return parsedValue;
}

// Change the health bar to INITIALIZE THE HEALTH BAR based on parameter
adjustHealthBars(chosenMaxLife);

// When attack button is clicked...
// Let the damage value equal the monster damage based on the attack value
// current monster health has damage value reduction

function attackHandler() {
	attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
	attackMonster(MODE_STRONG_ATTACK);
}

function reset() {
	currentMonsterHealth = chosenMaxLife;
	currentPlayerHealth = chosenMaxLife;
	resetGame(chosenMaxLife);
	hasBonusLife = true;
}

function writeToLog(ev, val, monsterHealth, playerHealth) {
	let logEntry;
	if (ev === LOG_EVENT_PLAYER_ATTACK) {
		logEntry = {
			event: ev,
			value: val,
			target: 'MONSTER',
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	} else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
		logEntry = {
			event: ev,
			value: val,
			target: 'MONSTER',
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	} else if (ev === LOG_EVENT_MONSTER_ATTACK) {
		logEntry = {
			event: ev,
			value: val,
			target: 'PLAYER',
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	} else if (ev === LOG_EVENT_PLAYER_HEAL) {
		logEntry = {
			event: ev,
			value: val,
			target: 'PLAYER',
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	} else if (ev === LOG_EVENT_GAME_OVER) {
		logEntry = {
			event: ev,
			value: val,
			finalMonsterHealth: monsterHealth,
			finalPlayerHealth: playerHealth,
		};
	}
	battleLog.push(logEntry);
}

function healPlayerHandler() {
	let healValue;
	let logEvent = LOG_EVENT_PLAYER_HEAL;
	if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
		alert("You can't heal more than the MAX health.");
		healValue = chosenMaxLife - currentPlayerHealth;
	} else {
		healValue = HEAL_VALUE;
	}
	increasePlayerHealth(healValue); //change the html/css bar val
	currentPlayerHealth += healValue; //change the internal tracker

	writeToLog(logEvent, healValue, currentMonsterHealth, currentPlayerHealth);

	endGame();
}

function endGame() {
	const damage2 = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= damage2;
	writeToLog(
		LOG_EVENT_MONSTER_ATTACK,
		damage2,
		currentMonsterHealth,
		currentPlayerHealth
	);

	if (currentPlayerHealth <= 0 && hasBonusLife) {
		alert('-- SECOND LIFE USED --');

		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = chosenMaxLife;
		increasePlayerHealth(chosenMaxLife);
	}

	if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert('YOU WIN!');
		writeToLog(
			LOG_EVENT_GAME_OVER,
			'PLAYER WON',
			currentMonsterHealth,
			currentPlayerHealth
		);
		reset();
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert('YOU LOSE!');
		writeToLog(
			LOG_EVENT_GAME_OVER,
			'MONSTER WON',
			currentMonsterHealth,
			currentPlayerHealth
		);
		reset();
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
		alert('ITS A DRAW!');
		writeToLog(
			LOG_EVENT_GAME_OVER,
			'WE HAVE A DRAW',
			currentMonsterHealth,
			currentPlayerHealth
		);
		reset();
	}
}

// Run attackHandler Method on Attack button CLICK
attackBtn.addEventListener('click', attackHandler);

// Run attackHandler Method on STRONG Attack button CLICK
strongAttackBtn.addEventListener('click', strongAttackHandler);

// Run attackHandler Method on Attack button CLICK
healBtn.addEventListener('click', healPlayerHandler);

logBtn.addEventListener('click', printLogHandler);

function printLogHandler() {
	for (let i = 0; i < battleLog.length; i++) {
		// console.log('-----');
		console.log(battleLog[i]);
	}
}

function attackMonster(mode) {
	let maxDamage; // = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
	let logEvent;
	if (mode === 'ATTACK') {
		maxDamage = ATTACK_VALUE;
		logEvent = LOG_EVENT_PLAYER_ATTACK;
	} else if (mode === 'STRONG_ATTACK') {
		maxDamage = STRONG_ATTACK_VALUE;
		logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
	}
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
	writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
	endGame();
}
