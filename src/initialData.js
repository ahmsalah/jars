export const initialCategories = [
	{ name: 'Groceries', type: 'exp', icon: 'icon_3' },
	{ name: 'Internet', type: 'exp', icon: 'icon_126' },
	{ name: 'Phone', type: 'exp', icon: 'icon_134' },
	{ name: 'Transportation', type: 'exp', icon: 'icon_127' },
	{ name: 'Travel', type: 'exp', icon: 'icon_5' },
	{ name: 'Gas', type: 'exp', icon: 'icon_129' },
	{ name: 'Electricity', type: 'exp', icon: 'icon_125' },
	{ name: 'Rent', type: 'exp', icon: 'icon_136' },
	{ name: 'Shopping', type: 'exp', icon: 'icon_7' },
	{ name: 'Food', type: 'exp', icon: 'icon_133' },
	{ name: 'Pay off debt', type: 'exp', icon: 'icon_140' },
	{ name: 'Installment', type: 'exp', icon: 'icon_112' },
	{ name: 'Entertainment', type: 'exp', icon: 'icon_6' },
	{ name: 'Café', type: 'exp', icon: 'icon_105' },
	{ name: 'Others', type: 'exp', icon: 'ic_category_other_expense' },

	{ name: 'Initial balance', type: 'inc', icon: 'icon_109' },
	{ name: 'Salary', type: 'inc', icon: 'ic_category_salary' },
	{ name: 'Savings', type: 'inc', icon: 'icon_141' },
	{ name: 'Bonus', type: 'inc', icon: 'icon_57' },
	{ name: 'Others', type: 'inc', icon: 'ic_category_other_income' },
	{ name: 'Gifts', type: 'inc', icon: 'ic_category_give' },
	{ name: 'Interest money', type: 'inc', icon: 'ic_category_interestmoney' }
];

const transactions = [
	{
		amount: 3500,
		category: 'Initial balance',
		date: new Date('2019-10-01'),
		description: '',

		type: 'inc'
	},
	{
		amount: -20,
		category: 'Transportation',
		date: new Date('2019-10-04'),
		description: 'Uber',

		type: 'exp'
	},
	{
		amount: -250,
		category: 'Phone',
		date: new Date('2019-10-07'),
		description: 'Phone bill',

		type: 'exp'
	},
	{
		amount: -400,
		category: 'Groceries',
		date: new Date('2019-10-26'),
		description: `For next week's party`,

		type: 'exp'
	},
	{
		amount: 8000,
		category: 'Salary',
		date: new Date('2019-10-28'),
		description: '',

		type: 'inc'
	},
	{
		amount: -150,
		category: 'Transportation',
		date: new Date('2019-10-20'),
		description: 'Transportation to alex',

		type: 'exp'
	},
	{
		amount: -700,
		category: 'Shopping',
		date: new Date('2019-10-15'),
		description: 'Bought a new jeans',

		type: 'exp'
	},
	{
		amount: -90,
		category: 'Food',
		date: new Date('2019-10-07'),
		description: `Ordered food while at work`,

		type: 'exp'
	},
	{
		amount: -350,
		category: 'Gas',
		date: new Date('2019-10-06'),
		description: '',

		type: 'exp'
	},
	{
		amount: -3000,
		category: 'Pay off debt',
		date: new Date('2019-10-07'),
		description: '',

		type: 'exp'
	}
];

export const initialTransactions = transactions.map(function(tr) {
	let displayIcon = Object.assign({}, tr);

	displayIcon.icon = initialCategories.filter(ct => ct.name === tr.category)[0].icon;
	return displayIcon;
});
