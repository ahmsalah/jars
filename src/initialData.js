import uuid from 'uuid/v4';

export const initialCategories = [
	{ id: uuid(), name: 'Groceries', type: 'exp', icon: 'icon_3' },
	{ id: uuid(), name: 'Internet', type: 'exp', icon: 'icon_126' },
	{ id: uuid(), name: 'Phone', type: 'exp', icon: 'icon_134' },
	{ id: uuid(), name: 'Transportation', type: 'exp', icon: 'icon_127' },
	{ id: uuid(), name: 'Travel', type: 'exp', icon: 'icon_5' },
	{ id: uuid(), name: 'Gas', type: 'exp', icon: 'icon_129' },
	{ id: uuid(), name: 'Electricity', type: 'exp', icon: 'icon_125' },
	{ id: uuid(), name: 'Rent', type: 'exp', icon: 'icon_136' },
	{ id: uuid(), name: 'Shopping', type: 'exp', icon: 'icon_7' },
	{ id: uuid(), name: 'Food', type: 'exp', icon: 'icon_133' },
	{ id: uuid(), name: 'Pay off debt', type: 'exp', icon: 'icon_140' },
	{ id: uuid(), name: 'Installment', type: 'exp', icon: 'icon_112' },
	{ id: uuid(), name: 'Entertainment', type: 'exp', icon: 'icon_6' },
	{ id: uuid(), name: 'Café', type: 'exp', icon: 'icon_105' },
	{ id: uuid(), name: 'Others', type: 'exp', icon: 'ic_category_other_expense' },

	{ id: uuid(), name: 'Initial balance', type: 'inc', icon: 'icon_109' },
	{ id: uuid(), name: 'Salary', type: 'inc', icon: 'ic_category_salary' },
	{ id: uuid(), name: 'Savings', type: 'inc', icon: 'icon_141' },
	{ id: uuid(), name: 'Bonus', type: 'inc', icon: 'icon_57' },
	{ id: uuid(), name: 'Others', type: 'inc', icon: 'ic_category_other_income' },
	{ id: uuid(), name: 'Gifts', type: 'inc', icon: 'ic_category_give' },
	{ id: uuid(), name: 'Interest money', type: 'inc', icon: 'ic_category_interestmoney' }
];

const transactions = [
	{
		amount: 3500,
		category: 'Initial balance',
		date: new Date('2019-10-01'),
		description: '',
		id: uuid(),
		type: 'inc'
	},
	{
		amount: -20,
		category: 'Transportation',
		date: new Date('2019-10-04'),
		description: 'Uber',
		id: uuid(),
		type: 'exp'
	},
	{
		amount: -250,
		category: 'Phone',
		date: new Date('2019-10-07'),
		description: 'Phone bill',
		id: uuid(),
		type: 'exp'
	},
	{
		amount: -400,
		category: 'Groceries',
		date: new Date('2019-10-26'),
		description: `For next week's party`,
		id: uuid(),
		type: 'exp'
	},
	{
		amount: 8000,
		category: 'Salary',
		date: new Date('2019-10-28'),
		description: '',
		id: uuid(),
		type: 'inc'
	},
	{
		amount: -150,
		category: 'Transportation',
		date: new Date('2019-10-20'),
		description: 'Transportation to alex',
		id: uuid(),
		type: 'exp'
	},
	{
		amount: -700,
		category: 'Shopping',
		date: new Date('2019-10-15'),
		description: 'Bought a new jeans',
		id: uuid(),
		type: 'exp'
	},
	{
		amount: -90,
		category: 'Food',
		date: new Date('2019-10-07'),
		description: `Ordered food while at work`,
		id: uuid(),
		type: 'exp'
	},
	{
		amount: -350,
		category: 'Gas',
		date: new Date('2019-10-06'),
		description: '',
		id: uuid(),
		type: 'exp'
	},
	{
		amount: -3000,
		category: 'Pay off debt',
		date: new Date('2019-10-07'),
		description: '',
		id: uuid(),
		type: 'exp'
	}
];

export const initialTransactions = transactions.map(function(tr) {
	let displayIcon = Object.assign({}, tr);

	displayIcon.icon = initialCategories.filter(ct => ct.name === tr.category)[0].icon;
	return displayIcon;
});
