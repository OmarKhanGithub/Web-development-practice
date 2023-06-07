let currentResult = 0;
// currentResult = currentResult + 10 * 8;
let logEntries = [];

function getUserNumberInput() {
	return parseInt(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
	const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
	outputResult(currentResult, calcDescription);
}

function writeToLog(
	operationIdentifier,
	prevResult,
	operationNumber,
	newResult
) {
	const logEntry = {
		operation: operationIdentifier,
		prevResult: prevResult,
		number: operationNumber,
		result: newResult,
	};
	logEntries.push(logEntry);
	console.log(logEntry.operation);
	console.log(logEntries);
}

function calculateResult(calculationType) {
	const enteredNumber = getUserNumberInput();
	const initialResult = currentResult;
	let mathOperator;
	if (calculationType === 'ADD') {
		currentResult += enteredNumber;
		mathOperator = '+';
	} else if (calculationType === 'SUBTRACT') {
		currentResult -= enteredNumber;
		mathOperator = '-';
	} else if (calculationType === 'MULTIPLY') {
		currentResult *= enteredNumber;
		mathOperator = 'x';
	} else if (calculationType === 'DIVIDE') {
		currentResult /= enteredNumber;
		mathOperator = '/';
	} else {
		currentResult = 0;
		mathOperator = '???';
	}
	// currentResult = currentResult + enteredNumber;
	createAndWriteOutput(mathOperator, initialResult, enteredNumber);
	writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

function add() {
	calculateResult('ADD');
}

function subtract() {
	calculateResult('SUBTRACT');
}

function multiply() {
	calculateResult('MULTIPLY');
}

function divide() {
	calculateResult('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);

// currentResult = add(100, 200);
// add(2222, 3333);

// let calculationDescription = `${currentResult} (0 + 10)`;

//const userInput = 123;
// let result;

// result = 18 + userInput;

// // result = result - 100;
// // result = result * 2;
// // result = result / 3;

// // //That value did not change

// // alert(result)
// // alert(userInput)
