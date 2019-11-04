export const initialCategories = {
	allCategories: {
		'ctg-1': { id: 'ctg-1', name: 'Groceries', type: 'exp', icon: 'icon_3' },
		'ctg-2': { id: 'ctg-2', name: 'Internet', type: 'exp', icon: 'icon_126' },
		'ctg-3': { id: 'ctg-3', name: 'Phone', type: 'exp', icon: 'icon_134' },
		'ctg-4': { id: 'ctg-4', name: 'Transportation', type: 'exp', icon: 'icon_127' },
		'ctg-5': { id: 'ctg-5', name: 'Travel', type: 'exp', icon: 'icon_5' },
		'ctg-6': { id: 'ctg-6', name: 'Gas', type: 'exp', icon: 'icon_129' },
		'ctg-7': { id: 'ctg-7', name: 'Electricity', type: 'exp', icon: 'icon_125' },
		'ctg-8': { id: 'ctg-8', name: 'Rent', type: 'exp', icon: 'icon_136' },
		'ctg-9': { id: 'ctg-9', name: 'Shopping', type: 'exp', icon: 'icon_7' },
		'ctg-10': { id: 'ctg-10', name: 'Food', type: 'exp', icon: 'icon_133' },
		'ctg-11': { id: 'ctg-11', name: 'Pay off debt', type: 'exp', icon: 'icon_140' },
		'ctg-12': { id: 'ctg-12', name: 'Installment', type: 'exp', icon: 'icon_112' },
		'ctg-13': { id: 'ctg-13', name: 'Entertainment', type: 'exp', icon: 'icon_6' },
		'ctg-14': { id: 'ctg-14', name: 'Café', type: 'exp', icon: 'icon_105' },
		'ctg-15': { id: 'ctg-15', name: 'Others', type: 'exp', icon: 'ic_category_other_expense' },

		'ctg-0001': { id: 'ctg-0001', name: 'Initial balance', type: 'inc', icon: 'icon_109' },
		'ctg-0002': { id: 'ctg-0002', name: 'Salary', type: 'inc', icon: 'ic_category_salary' },
		'ctg-0003': { id: 'ctg-0003', name: 'Savings', type: 'inc', icon: 'icon_141' },
		'ctg-0004': { id: 'ctg-0004', name: 'Bonus', type: 'inc', icon: 'icon_57' },
		'ctg-0005': {
			id: 'ctg-0005',
			name: 'Others',
			type: 'inc',
			icon: 'ic_category_other_income'
		},
		'ctg-0006': { id: 'ctg-0006', name: 'Gifts', type: 'inc', icon: 'ic_category_give' },
		'ctg-0007': {
			id: 'ctg-0007',
			name: 'Interest money',
			type: 'inc',
			icon: 'ic_category_interestmoney'
		}
	},

	lists: {
		exp: {
			id: 'exp',
			title: 'Expenses',
			categoriesIds: [
				'ctg-1',
				'ctg-2',
				'ctg-3',
				'ctg-4',
				'ctg-5',
				'ctg-6',
				'ctg-7',
				'ctg-8',
				'ctg-9',
				'ctg-10',
				'ctg-11',
				'ctg-12',
				'ctg-13',
				'ctg-14',
				'ctg-15'
			]
		},
		inc: {
			id: 'inc',
			title: 'Income',
			categoriesIds: [
				'ctg-0001',
				'ctg-0002',
				'ctg-0003',
				'ctg-0004',
				'ctg-0005',
				'ctg-0006',
				'ctg-0007'
			]
		}
	},

	listOrder: [ 'exp', 'inc' ]
};

const transactions = [
	{
		amount: 35000,
		category: 'Initial balance',
		date: new Date('2019-11-01'),
		description: '',

		type: 'inc'
	},
	{
		amount: -20,
		category: 'Transportation',
		date: new Date('2019-11-04'),
		description: 'Uber',

		type: 'exp'
	},
	{
		amount: -250,
		category: 'Phone',
		date: new Date('2019-11-07'),
		description: 'Phone bill',

		type: 'exp'
	},
	{
		amount: -4000,
		category: 'Groceries',
		date: new Date('2019-11-26'),
		description: `For next week's party`,

		type: 'exp'
	},
	{
		amount: 80000,
		category: 'Salary',
		date: new Date('2019-11-28'),
		description: '',

		type: 'inc'
	},
	{
		amount: -150,
		category: 'Transportation',
		date: new Date('2019-11-20'),
		description: 'Transportation to alex',

		type: 'exp'
	},
	{
		amount: -7000,
		category: 'Shopping',
		date: new Date('2019-11-15'),
		description: 'Bought a new jeans',

		type: 'exp'
	},
	{
		amount: -90,
		category: 'Food',
		date: new Date('2019-11-07'),
		description: `Ordered food while at work`,

		type: 'exp'
	},
	{
		amount: -350,
		category: 'Gas',
		date: new Date('2019-11-06'),
		description: '',

		type: 'exp'
	},
	{
		amount: -30000,
		category: 'Pay off debt',
		date: new Date('2019-11-07'),
		description: '',

		type: 'exp'
	}
];

export const initialTransactions = transactions.map(function(tr) {
	let displayIcon = Object.assign({}, tr);

	displayIcon.icon = Object.values(initialCategories.allCategories).filter(
		ct => ct.name === tr.category
	)[0].icon;
	return displayIcon;
});
