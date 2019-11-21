export const initialCategories = {
	allCategories: {
		'ctg-1': { id: 'ctg-1', name: 'Transportation', type: 'exp', icon: 'icon_127' },
		'ctg-21': { id: 'ctg-21', name: 'Gas', type: 'exp', icon: 'icon_129' },
		'ctg-2': { id: 'ctg-2', name: 'Travel', type: 'exp', icon: 'icon_5' },
		'ctg-3': { id: 'ctg-3', name: 'Shopping', type: 'exp', icon: 'icon_7' },
		'ctg-4': { id: 'ctg-4', name: 'Clothing', type: 'exp', icon: 'icon_17' },
		'ctg-5': { id: 'ctg-5', name: 'Footwear', type: 'exp', icon: 'icon_100' },
		'ctg-6': { id: 'ctg-6', name: 'Electronics', type: 'exp', icon: 'icon_9' },
		'ctg-7': { id: 'ctg-7', name: 'Groceries', type: 'exp', icon: 'icon_3' },
		// 'ctg-8': { id: 'ctg-8', name: 'Food', type: 'exp', icon: 'icon_87' },
		// 'ctg-9': { id: 'ctg-9', name: 'Beverage', type: 'exp', icon: 'icon_116' },
		'ctg-10': { id: 'ctg-10', name: 'Personal Care', type: 'exp', icon: 'icon_132' },
		'ctg-11': { id: 'ctg-11', name: 'Café', type: 'exp', icon: 'icon_105' },
		'ctg-12': { id: 'ctg-12', name: 'Restaurants', type: 'exp', icon: 'icon_133' },
		'ctg-13': { id: 'ctg-13', name: 'Movies', type: 'exp', icon: 'icon_6' },
		'ctg-14': { id: 'ctg-14', name: 'Entertainment', type: 'exp', icon: 'icon_49' },
		'ctg-15': { id: 'ctg-15', name: 'Internet', type: 'exp', icon: 'icon_126' },
		'ctg-16': { id: 'ctg-16', name: 'Phone', type: 'exp', icon: 'icon_134' },
		'ctg-17': { id: 'ctg-17', name: 'Electricity', type: 'exp', icon: 'icon_125' },
		'ctg-18': { id: 'ctg-18', name: 'Cable', type: 'exp', icon: 'icon_84' },
		'ctg-19': { id: 'ctg-19', name: 'Rent', type: 'exp', icon: 'icon_136' },
		'ctg-20': { id: 'ctg-20', name: 'Installments', type: 'exp', icon: 'icon_112' },
		'ctg-22': { id: 'ctg-22', name: 'Sports', type: 'exp', icon: 'icon_70' },
		'ctg-23': { id: 'ctg-23', name: 'Doctor', type: 'exp', icon: 'ic_category_doctor' },
		'ctg-24': { id: 'ctg-24', name: 'Pharmacy', type: 'exp', icon: 'ic_category_pharmacy' },
		'ctg-25': { id: 'ctg-25', name: 'Charity', type: 'exp', icon: 'ic_category_donations' },
		'ctg-26': { id: 'ctg-26', name: 'Home', type: 'exp', icon: 'icon_115' },
		'ctg-27': { id: 'ctg-27', name: 'Children & Babies', type: 'exp', icon: 'icon_38' },
		'ctg-28': { id: 'ctg-28', name: 'Decorations', type: 'exp', icon: 'icon_21' },
		'ctg-29': { id: 'ctg-29', name: 'Pets', type: 'exp', icon: 'icon_123' },
		'ctg-30': { id: 'ctg-30', name: 'Education', type: 'exp', icon: 'icon_113' },
		'ctg-31': { id: 'ctg-32', name: 'Others', type: 'exp', icon: 'icon_23' },

		'ctg-0001': { id: 'ctg-0001', name: 'Initial balance', type: 'inc', icon: 'icon_109' },
		'ctg-0002': { id: 'ctg-0002', name: 'Salary', type: 'inc', icon: 'ic_category_salary' },
		'ctg-0003': { id: 'ctg-0003', name: 'Savings', type: 'inc', icon: 'icon_141' },
		'ctg-0004': { id: 'ctg-0004', name: 'Bonus', type: 'inc', icon: 'icon_57' },
		'ctg-0005': { id: 'ctg-0005', name: 'Awards', type: 'inc', icon: 'ic_category_award' },
		'ctg-0006': { id: 'ctg-0006', name: 'Sale', type: 'inc', icon: 'icon_121' },
		'ctg-0007': { id: 'ctg-0007', name: 'Gifts', type: 'inc', icon: 'ic_category_give' },
		'ctg-0008': {
			id: 'ctg-0008',
			name: 'Interest money',
			type: 'inc',
			icon: 'ic_category_interestmoney'
		},
		'ctg-0009': {
			id: 'ctg-0009',
			name: 'Others',
			type: 'inc',
			icon: 'icon_22'
		}
	},

	lists: {
		exp: {
			id: 'exp',
			title: 'Expenses',
			categoriesIds: [
				'ctg-1',
				'ctg-21',
				'ctg-2',
				'ctg-3',
				'ctg-4',
				'ctg-5',
				'ctg-6',
				'ctg-7',
				'ctg-10',
				'ctg-11',
				'ctg-12',
				'ctg-13',
				'ctg-14',
				'ctg-15',
				'ctg-16',
				'ctg-17',
				'ctg-18',
				'ctg-19',
				'ctg-20',
				'ctg-22',
				'ctg-23',
				'ctg-24',
				'ctg-25',
				'ctg-26',
				'ctg-27',
				'ctg-28',
				'ctg-29',
				'ctg-30',
				'ctg-31'
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
				'ctg-0007',
				'ctg-0008',
				'ctg-0009'
			]
		}
	},

	listOrder: [ 'exp', 'inc' ]
};

export const initialBudgets = {
	lists: {
		'budget-1': {
			id: 'budget-1',
			title: 'Shopping',
			categoriesIds: [
				'ctg-3',
				'ctg-4',
				'ctg-5',
				'ctg-6',
				'ctg-7',
				// 'ctg-8',
				// 'ctg-9',
				'ctg-10'
			],
			categories: [
				{ id: 'ctg-3', name: 'Shopping', type: 'exp', icon: 'icon_7' },
				{ id: 'ctg-4', name: 'Clothing', type: 'exp', icon: 'icon_17' },
				{ id: 'ctg-5', name: 'Footwear', type: 'exp', icon: 'icon_100' },
				{ id: 'ctg-6', name: 'Electronics', type: 'exp', icon: 'icon_9' },
				{ id: 'ctg-7', name: 'Groceries', type: 'exp', icon: 'icon_3' },
				// { id: 'ctg-8', name: 'Food', type: 'exp', icon: 'icon_87' },
				// { id: 'ctg-9', name: 'Beverage', type: 'exp', icon: 'icon_116' },
				{ id: 'ctg-10', name: 'Personal Care', type: 'exp', icon: 'icon_132' }
			],
			planned: 2000
		},
		'budget-2': {
			id: 'budget-2',
			title: 'Transportation',
			categoriesIds: [ 'ctg-1', 'ctg-2', 'ctg-21' ],
			categories: [
				{ id: 'ctg-1', name: 'Transportation', type: 'exp', icon: 'icon_127' },
				{ id: 'ctg-2', name: 'Travel', type: 'exp', icon: 'icon_5' },
				{ id: 'ctg-21', name: 'Gas', type: 'exp', icon: 'icon_129' }
			],
			planned: 1500
		},
		'budget-3': {
			id: 'budget-3',
			title: 'Bills & Utilities',
			categoriesIds: [ 'ctg-15', 'ctg-16', 'ctg-17', 'ctg-18', 'ctg-19', 'ctg-20' ],
			categories: [
				{ id: 'ctg-15', name: 'Internet', type: 'exp', icon: 'icon_126' },
				{ id: 'ctg-16', name: 'Phone', type: 'exp', icon: 'icon_134' },
				{ id: 'ctg-17', name: 'Electricity', type: 'exp', icon: 'icon_125' },
				{ id: 'ctg-18', name: 'Cable', type: 'exp', icon: 'icon_84' },
				{ id: 'ctg-19', name: 'Rent', type: 'exp', icon: 'icon_136' },
				{ id: 'ctg-20', name: 'Installments', type: 'exp', icon: 'icon_112' }
			],
			planned: 2000
		},
		'budget-4': {
			id: 'budget-4',
			title: 'Health & Fitness',
			categoriesIds: [ 'ctg-22', 'ctg-23', 'ctg-24' ],
			categories: [
				{ id: 'ctg-22', name: 'Sports', type: 'exp', icon: 'icon_70' },
				{ id: 'ctg-23', name: 'Doctor', type: 'exp', icon: 'ic_category_doctor' },
				{ id: 'ctg-24', name: 'Pharmacy', type: 'exp', icon: 'ic_category_pharmacy' }
			],
			planned: 500
		},
		'budget-5': {
			id: 'budget-5',
			title: 'Home',
			categoriesIds: [ 'ctg-26', 'ctg-27', 'ctg-28', 'ctg-29' ],
			categories: [
				{ id: 'ctg-26', name: 'Home', type: 'exp', icon: 'icon_115' },
				{ id: 'ctg-27', name: 'Children & Babies', type: 'exp', icon: 'icon_38' },
				{ id: 'ctg-28', name: 'Decorations', type: 'exp', icon: 'icon_21' },
				{ id: 'ctg-29', name: 'Pets', type: 'exp', icon: 'icon_123' }
			],
			planned: 1000
		},

		'budget-0': {
			id: 'budget-0',
			title: 'Others',
			categoriesIds: [ 'ctg-11', 'ctg-12', 'ctg-30', 'ctg-31' ],
			categories: [
				{ id: 'ctg-11', name: 'Café', type: 'exp', icon: 'icon_105' },
				{ id: 'ctg-12', name: 'Restaurants', type: 'exp', icon: 'icon_133' },
				{ id: 'ctg-30', name: 'Education', type: 'exp', icon: 'icon_113' },
				{ id: 'ctg-31', name: 'Others', type: 'exp', icon: 'icon_23' }
			],
			planned: 500
		}
	},

	listOrder: [ 'budget-0', 'budget-1', 'budget-2', 'budget-3', 'budget-4', 'budget-5' ]
};

const transactions = [
	{
		amount: 3500,
		category: {
			name: 'Initial balance'
		},
		date: new Date('2019-11-29'),
		description: '',
		type: 'inc'
	},
	{
		amount: -70,
		category: {
			name: 'Transportation'
		},
		date: new Date('2019-11-04'),
		description: 'Uber',
		type: 'exp'
	},
	{
		amount: 8000,
		category: {
			name: 'Salary'
		},
		date: new Date('2019-11-22'),
		description: '',
		type: 'inc'
	},
	{
		amount: -700,
		category: {
			name: 'Clothing'
		},
		date: new Date('2019-11-15'),
		description: 'Bought a new jeans',
		type: 'exp'
	},
	{
		amount: -450,
		category: {
			name: 'Gas'
		},
		date: new Date('2019-11-06'),
		description: '',
		type: 'exp'
	},
	{
		amount: -1300,
		category: {
			name: 'Groceries'
		},
		date: new Date('2019-11-26'),
		description: `For next week's party`,
		type: 'exp'
	},
	{
		amount: -250,
		category: {
			name: 'Café'
		},
		date: new Date('2019-11-26'),
		description: ``,
		type: 'exp'
	}
	// {
	// 	amount: -90,
	// 	category: {
	// 		name: 'Food'
	// 	},
	// 	date: new Date('2019-11-07'),
	// 	description: `Ordered food while at work`,
	// 	type: 'exp'
	// },
	// {
	// 	amount: -350,
	// 	category: {
	// 		name: 'Phone',
	// },
	// 	date: new Date('2019-11-07'),
	// 	description: 'Phone bill',
	// 	type: 'exp'
	// },
	// {
	// 	amount: -250,
	// 	category: {
	// 		name: 'Transportation',
	// },
	// 	date: new Date('2019-11-20'),
	// 	description: 'Transportation to dahab',
	// 	type: 'exp'
	// },
	// {
	// 	amount: -6500,
	// 	category: {
	// 		name: 'Rent',
	// },
	// 	date: new Date('2019-11-03'),
	// 	description: '',
	// 	type: 'exp'
	// }
];

export const initialTransactions = transactions.map(tr => ({
	...tr,
	category: Object.values(initialCategories.allCategories).filter(
		ct => ct.name === tr.category.name
	)[0]
}));
