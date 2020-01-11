import { calcExpInc, reduceObjValues } from '../helpers';
import compareAsc from 'date-fns/compareAsc';
import format from 'date-fns/format';

function useChartData(transactions, allTransactions) {
	const colors = [
		'#482880',
		'#a31545',
		'#4caf50',
		'#3f51b5',
		'#ff9800',
		'#9c27b0',
		'#f44336',
		'#00695f',
		'#2196f3',
		'#e91e63',
		'#cddc39',
		'#ff784e',
		'#8bc34a',
		'#ffef62',
		'#009688',
		'#af52bf'
	];

	/**
	|--------------------------------------------------
	| Bar & Line Charts
	|--------------------------------------------------
	*/
	// add month to allTransactions
	const allTrs = allTransactions.map(tr => ({ ...tr, month: format(tr.date, 'MMM yyyy') }));
	// Split allTransactions array into expenses and income
	const allExpTrs = allTrs.filter(tr => tr.type === 'exp');
	const allIncTrs = allTrs.filter(tr => tr.type === 'inc');

	// merge transactions of the same month and sum their amount
	const expByMonth = reduceObjValues(allExpTrs, 'month', 'amount');
	const incByMonth = reduceObjValues(allIncTrs, 'month', 'amount');
	// [..., {month: "Dec 2019", totalInc: 3000, totalExp: -2200}]

	// get the months of allTransactions
	const months = allTransactions
		.map(tr => tr.date)
		.sort(compareAsc)
		.map(trDate => format(trDate, 'MMM yyyy'))
		.filter((val, i, arr) => arr.indexOf(val) === i);

	const totalExpIncByMonth = months.map(month => {
		const totalExpArr = expByMonth.filter(v => v.month === month);
		const totalIncArr = incByMonth.filter(v => v.month === month);

		return {
			month,
			totalExp: totalExpArr.length ? totalExpArr[0].amount : 0,
			totalInc: totalIncArr.length ? totalIncArr[0].amount : 0
		};
	});

	const cashFlow = totalExpIncByMonth.map(val => ({
		month: val.month,
		total: val.totalExp + val.totalInc
	}));

	// console.log(allTrsDates[0], allTrsDates[allTrsDates.length - 1]);
	// console.log(parse(months[1], 'MMM yy', new Date()));

	/**
	|--------------------------------------------------
	| Pie Chart
	|--------------------------------------------------
	*/
	// get the total of income and expenses of this month
	const [ totalExp, totalInc ] = calcExpInc(transactions);

	const trs = transactions.map(tr => {
		return {
			amount: tr.amount,
			category: tr.category.name,
			type: tr.type,
			icon: tr.category.icon
		};
	});

	// merge transactions of the same category, sum their amount and add percentage to each one.
	const chartData = reduceObjValues(trs, 'category', 'amount', 'type', 'icon').map(val => ({
		...val,
		percentage: val.amount / (val.type === 'exp' ? totalExp : totalInc) * 100
	}));
	const expChartData = chartData.filter(val => val.type === 'exp');
	const incChartData = chartData.filter(val => val.type === 'inc');
	const incChartDataSorted = [ ...incChartData ].sort((a, b) => b.amount - a.amount);
	const expChartDataSorted = [ ...expChartData ].sort((a, b) => a.amount - b.amount);

	const charts = [
		{ type: 'exp', chartData: expChartDataSorted, total: totalExp },
		{ type: 'inc', chartData: incChartDataSorted, total: totalInc }
	];

	return { charts, colors, totalExpIncByMonth, cashFlow };
}

export default useChartData;
