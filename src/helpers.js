/**
|--------------------------------------------------
| Function to sort an array of objects by some specific key.
| @param {Array} array to be sorted.
| @param {String} value that the array will be sorted by.
| @param {boolean} if true, reverse the order of the array.
|--------------------------------------------------
*/
function sortList(array, sortBy, isReversed) {
	let arr = [ ...array ];
	let sortedList;
	if (sortBy === 'date') {
		sortedList = arr.sort((a, b) => (isReversed ? a.date - b.date : b.date - a.date));
	} else if (sortBy === 'amount') {
		sortedList = arr.sort((a, b) => (isReversed ? a.amount - b.amount : b.amount - a.amount));
	} else if (sortBy === 'category') {
		sortedList = arr.sort(
			(a, b) =>
				isReversed
					? b.category.localeCompare(a.category)
					: a.category.localeCompare(b.category)
		);
	}
	return sortedList;
}

/**
|--------------------------------------------------
| Function to sort an array of objects by some specific key.
| @param {Array} array to be filtered.
| @param {Date Object} the date object that the array will be sorted by.
|--------------------------------------------------
*/
function filterArrayByDate(array, date) {
	let arr = [ ...array ];
	const filteredArray = arr.filter(v => {
		const arrayDate = `${v.date.getMonth()} ${v.date.getFullYear()}`;
		const dt = `${date.getMonth()} ${date.getFullYear()}`;
		return dt === arrayDate;
	});
	return filteredArray;
}

/**
|--------------------------------------------------
| Function to sum the values of an array.
| @param {Array} array that its values to be summed.
|--------------------------------------------------
*/
function sumTotal(arr) {
	const reducer = (acc, curr) => acc + curr;
	return arr.length > 0 ? arr.reduce(reducer) : 0;
}

/**
|--------------------------------------------------
| Function to push the values (or the objects) of an array of objects' values to 2 arrays based on a condition.
| @param {Array} array of objects that its values will be pushed to 2 new arrays.
| @param {String} or {boolean} if a second parameter is passed, push the object amount value.
|--------------------------------------------------
*/
function pushToArrays(arr, condt) {
	let incArray = [];
	let expArray = [];
	arr.forEach(i => {
		// if a second parameter is passed, push the object amount value
		let val = condt ? i.amount : i;
		if (i.type === 'inc') {
			incArray.push(val);
		} else if (i.type === 'exp') {
			expArray.push(val);
		}
	});

	return [ incArray, expArray ];
}

/**
|--------------------------------------------------
| Function to format the date to Day-Month-Year
| @param {Date} the date to be formated
|--------------------------------------------------
*/
function formatDate(date) {
	const monthsArr = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	// const d = date.getDate();
	const d = date.getDate().toString().padStart(2, '0');
	const m = monthsArr[date.getMonth()];
	// const m = date.getMonth() + 1;
	const y = date.getFullYear();

	return `${d}-${m}-${y}`;
}

/**
|--------------------------------------------------
| Function to format number to currency
| @param {number} the amount to be formated
| @param {boolean} whether to include a plus/minus sign or not
| @param {string}	currency symbol
| @param {number} numbers of decimals
| @param {string} decimal character
| @param {string} thousands sperator character
|--------------------------------------------------
*/
function formatAmount(
	amount,
	includePlusMinusSymbol = true,
	currency = '£',
	decimalCount = 2,
	decimal = '.',
	thousands = ','
) {
	try {
		decimalCount = Math.abs(decimalCount);
		decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
		let plusMinusSymbol = '';
		includePlusMinusSymbol && (plusMinusSymbol = amount < 0 ? '-' : '+');

		let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
		let j = i.length > 3 ? i.length % 3 : 0;

		return (
			plusMinusSymbol +
			currency +
			' ' +
			(j ? i.substr(0, j) + thousands : '') +
			i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
			(decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
		);
	} catch (e) {
		console.log(e);
	}
}

/**
|--------------------------------------------------
| Function, returns the percentages of two numbers in relation to each other
| @param {number} first number
| @param {number} second number
| @param {boolean} if true, multiplies the results by 1.2 if both the results are less than 80
|--------------------------------------------------
*/
const getPercentageOfTwoNumbers = (num1, num2, multiply) => {
	const lowerNum = 100 / (Math.max(num1, num2) / Math.min(num1, num2) + 1);
	const higherNum = 100 - lowerNum;

	let result1 = num1 > num2 ? higherNum : lowerNum;
	let result2 = num2 > num1 ? higherNum : lowerNum;
	if (multiply && Math.max(result1, result2) < 80) {
		result1 *= 1.2;
		result2 *= 1.2;
	}
	return [ result1, result2 ];
};

export {
	sortList,
	sumTotal,
	pushToArrays,
	formatDate,
	formatAmount,
	getPercentageOfTwoNumbers,
	filterArrayByDate
};
