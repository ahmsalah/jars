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
		sortedList = arr.sort((a, b) => (isReversed ? a.date - b.date : a.date - b.date));
	} else if (sortBy === 'amount') {
		sortedList = arr.sort(
			(a, b) => (isReversed ? a.amount - b.amount : b.amount - a.amount)
		);
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
	const d = date.getDate();
	// const d = date.getDate().toString().padStart(2, '0');
	const m = monthsArr[date.getMonth()];
	// const m = date.getMonth() + 1;
	const y = date.getFullYear();

	return `${d}-${m}-${y}`;
}

export { sortList, sumTotal, pushToArrays, formatDate };
