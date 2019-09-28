/**
|--------------------------------------------------
| Function to sort an array of objects by some specific key.
| @param {Array} array to be sorted.
| @param {String} value that the array will be sorted by.
|--------------------------------------------------
*/
function sortList(arr, sortBy) {
	let sortedList;
	if (sortBy === 'date') {
		sortedList = arr.sort((a, b) => new Date(b.date) - new Date(a.date));
	} else if (sortBy === 'amount') {
		sortedList = arr.sort((a, b) => b.amount - a.amount);
	} else if (sortBy === 'category') {
		sortedList = arr.sort((a, b) => a.category.localeCompare(b.category));
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
| Function to push the values of an array of objects' values to 2 arrays based on a condition.
| @param {Array} array of objects that its values will be pushed to 2 new arrays.
|--------------------------------------------------
*/
function pushToArrays(arr) {
	let incArray = [];
	let expArray = [];
	arr.forEach(i => {
		if (i.type === 'inc') {
			incArray.push(i.amount);
		} else if (i.type === 'exp') {
			expArray.push(i.amount);
		}
	});

	return [ incArray, expArray ];
}

export { sortList, sumTotal, pushToArrays };
