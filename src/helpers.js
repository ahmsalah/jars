import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';

/**
|--------------------------------------------------
| Function to filter an array of objects by month.
| @param {Array} array to be filtered.
| @param {Date Object} the date object that the array will be filtered by.
|--------------------------------------------------
*/
function filterArrayByMonth(array, date) {
	const filteredArray = array.filter(
		v =>
			new Date(v.dateTimestamp.seconds * 1000) > startOfMonth(date) &&
			new Date(v.dateTimestamp.seconds * 1000) < endOfMonth(date)
	);
	return filteredArray;
}

/**
|--------------------------------------------------
| Calculate the total expenses and total income from the transactions array.
| @param {Array} transactions.
|--------------------------------------------------
*/
const calcExpInc = arr => {
	const totalExp = arr
		.filter(tr => tr.type === 'exp')
		.reduce((acc, curr) => acc + curr.amount, 0);
	const totalInc = arr
		.filter(tr => tr.type === 'inc')
		.reduce((acc, curr) => acc + curr.amount, 0);
	return [ totalExp, totalInc ];
};

/**
|--------------------------------------------------
| Function to format the date to Day-Month-Year
| @param {Date} the date to be formatted
| @param {Boolean} if true, include the year in the formatted date
|--------------------------------------------------
*/
function formatDate(date, includeYear) {
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

	return includeYear ? `${d}-${m}-${y}` : `${d}-${m}`;
}

/**
|--------------------------------------------------
| Function to capture the current time(hour-minute-second) and set it to the passed date object
| @param {Date} the date to set the current time on
|--------------------------------------------------
*/
function getExactTime(date) {
	const newDate = new Date();
	const d = date.getDate();
	const m = date.getMonth();
	const y = date.getFullYear();
	const parsedDate = newDate.setFullYear(y, m, d);
	const updatedDate = new Date(parsedDate);
	return updatedDate;
}

/**
|--------------------------------------------------
| Function to format number to currency
| @param {number} the amount to be formatted
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

/**
|--------------------------------------------------
| Filters an object by an object key
| @param {Object}	the object to be filtered
| @param {string} object key to filter by
|--------------------------------------------------
*/
const filterObjectByKey = (object, objKey) => {
	const allowed = Object.keys(object).filter(key => key !== objKey);

	return Object.keys(object).filter(key => allowed.includes(key)).reduce((obj, key) => {
		return {
			...obj,
			[key]: object[key]
		};
	}, {});
};

/**
|--------------------------------------------------
*/
export {
	filterArrayByMonth,
	calcExpInc,
	formatDate,
	getExactTime,
	formatAmount,
	getPercentageOfTwoNumbers,
	filterObjectByKey
};
