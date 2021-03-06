import startOfMonth from 'date-fns/startOfMonth';
import getUnixTime from 'date-fns/getUnixTime';
import set from 'date-fns/set';

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
		'ctg-8': { id: 'ctg-8', name: 'Lover & Friends', type: 'exp', icon: 'icon_148' },
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
		'ctg-22': { id: 'ctg-22', name: 'Gym & Sports', type: 'exp', icon: 'icon_70' },
		'ctg-23': { id: 'ctg-23', name: 'Doctor', type: 'exp', icon: 'icon_145' },
		'ctg-24': { id: 'ctg-24', name: 'Pharmacy', type: 'exp', icon: 'icon_146' },
		'ctg-25': { id: 'ctg-25', name: 'Charity', type: 'exp', icon: 'icon_149' },
		'ctg-26': { id: 'ctg-26', name: 'Home', type: 'exp', icon: 'icon_115' },
		'ctg-27': { id: 'ctg-27', name: 'Children & Babies', type: 'exp', icon: 'icon_38' },
		'ctg-28': { id: 'ctg-28', name: 'Decorations', type: 'exp', icon: 'icon_21' },
		'ctg-29': { id: 'ctg-29', name: 'Pets', type: 'exp', icon: 'icon_123' },
		'ctg-30': { id: 'ctg-30', name: 'Education', type: 'exp', icon: 'icon_113' },
		'ctg-31': { id: 'ctg-31', name: 'Others', type: 'exp', icon: 'icon_23' },

		'ctg-8001': { id: 'ctg-8001', name: 'Initial balance', type: 'inc', icon: 'icon_109' },
		'ctg-8002': { id: 'ctg-8002', name: 'Salary', type: 'inc', icon: 'icon_75' },
		'ctg-8003': { id: 'ctg-8003', name: 'Savings', type: 'inc', icon: 'icon_141' },
		'ctg-8004': { id: 'ctg-8004', name: 'Bonus', type: 'inc', icon: 'icon_57' },
		'ctg-8005': { id: 'ctg-8005', name: 'Awards', type: 'inc', icon: 'icon_111' },
		'ctg-8006': { id: 'ctg-8006', name: 'Sale', type: 'inc', icon: 'icon_121' },
		'ctg-8007': { id: 'ctg-8007', name: 'Gifts', type: 'inc', icon: 'icon_117' },
		'ctg-8008': { id: 'ctg-8008', name: 'Interest money', type: 'inc', icon: 'icon_118' },
		'ctg-8009': { id: 'ctg-8009', name: 'Others', type: 'inc', icon: 'icon_22' }
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
				'ctg-8',
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
				'ctg-8001',
				'ctg-8002',
				'ctg-8003',
				'ctg-8004',
				'ctg-8005',
				'ctg-8006',
				'ctg-8007',
				'ctg-8008',
				'ctg-8009'
			]
		}
	},

	listOrder: [ 'exp', 'inc' ]
};

const budgets = {
	0: {
		pMonth: 0,
		plannedInc: 0,
		budgetsOrder: [ 'budget-0', 'budget-1', 'budget-2', 'budget-3', 'budget-4', 'budget-5' ],
		allBudgets: {
			'budget-1': {
				id: 'budget-1',
				title: 'Shopping',
				categoriesIds: [
					'ctg-3',
					'ctg-4',
					'ctg-5',
					'ctg-6',
					'ctg-7',
					// 'ctg-9',
					'ctg-10'
				],
				categories: [
					{ id: 'ctg-3', name: 'Shopping', type: 'exp', icon: 'icon_7' },
					{ id: 'ctg-4', name: 'Clothing', type: 'exp', icon: 'icon_17' },
					{ id: 'ctg-5', name: 'Footwear', type: 'exp', icon: 'icon_100' },
					{ id: 'ctg-6', name: 'Electronics', type: 'exp', icon: 'icon_9' },
					{ id: 'ctg-7', name: 'Groceries', type: 'exp', icon: 'icon_3' },
					// { id: 'ctg-9', name: 'Beverage', type: 'exp', icon: 'icon_116' },
					{ id: 'ctg-10', name: 'Personal Care', type: 'exp', icon: 'icon_132' }
				],
				planned: 0
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
				planned: 0
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
				planned: 0
			},
			'budget-4': {
				id: 'budget-4',
				title: 'Personal',
				categoriesIds: [ 'ctg-22', 'ctg-23', 'ctg-24', 'ctg-25', 'ctg-8', 'ctg-30' ],
				categories: [
					{ id: 'ctg-22', name: 'Gym & Sports', type: 'exp', icon: 'icon_70' },
					{ id: 'ctg-23', name: 'Doctor', type: 'exp', icon: 'icon_145' },
					{ id: 'ctg-24', name: 'Pharmacy', type: 'exp', icon: 'icon_146' },
					{ id: 'ctg-25', name: 'Charity', type: 'exp', icon: 'icon_149' },
					{ id: 'ctg-8', name: 'Lover & Friends', type: 'exp', icon: 'icon_148' },
					{ id: 'ctg-30', name: 'Education', type: 'exp', icon: 'icon_113' }
				],
				planned: 0
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
				planned: 0
			},

			'budget-0': {
				id: 'budget-0',
				title: 'Others',
				categoriesIds: [ 'ctg-11', 'ctg-12', 'ctg-13', 'ctg-14', 'ctg-31' ],
				categories: [
					{ id: 'ctg-11', name: 'Café', type: 'exp', icon: 'icon_105' },
					{ id: 'ctg-12', name: 'Restaurants', type: 'exp', icon: 'icon_133' },
					{ id: 'ctg-13', name: 'Movies', type: 'exp', icon: 'icon_6' },
					{ id: 'ctg-14', name: 'Entertainment', type: 'exp', icon: 'icon_49' },
					{ id: 'ctg-31', name: 'Others', type: 'exp', icon: 'icon_23' }
				],
				planned: 0
			}
		}
	}
};

export const initialBudgets = {
	...budgets,
	[getUnixTime(startOfMonth(new Date()))]: {
		...budgets[0],
		pMonth: getUnixTime(startOfMonth(new Date()))
	}
};

export const initialJars = {
	jarsOrder: [ 'jar-0', 'jar-1', 'jar-2', 'jar-3', 'jar-4' ],
	allJars: {
		'jar-0': {
			id: 'jar-0',
			title: 'Save',
			percentage: 20,
			categoriesIds: [
				'ctg-8001',
				'ctg-8002',
				'ctg-8003',
				'ctg-8004',
				'ctg-8005',
				'ctg-8006',
				'ctg-8007',
				'ctg-8008',
				'ctg-8009'
			],
			categories: [
				{ id: 'ctg-8001', name: 'Initial balance', type: 'inc', icon: 'icon_109' },
				{ id: 'ctg-8002', name: 'Salary', type: 'inc', icon: 'icon_75' },
				{ id: 'ctg-8003', name: 'Savings', type: 'inc', icon: 'icon_141' },
				{ id: 'ctg-8004', name: 'Bonus', type: 'inc', icon: 'icon_57' },
				{ id: 'ctg-8005', name: 'Awards', type: 'inc', icon: 'icon_111' },
				{ id: 'ctg-8006', name: 'Sale', type: 'inc', icon: 'icon_121' },
				{ id: 'ctg-8007', name: 'Gifts', type: 'inc', icon: 'icon_117' },
				{ id: 'ctg-8008', name: 'Interest money', type: 'inc', icon: 'icon_118' },
				{ id: 'ctg-8009', name: 'Others', type: 'inc', icon: 'icon_22' }
			]
		},
		'jar-1': {
			id: 'jar-1',
			title: 'Necessities',
			percentage: 55,
			categoriesIds: [
				'ctg-1',
				'ctg-21',
				'ctg-3',
				'ctg-4',
				'ctg-5',
				'ctg-7',
				'ctg-8',
				'ctg-10',
				'ctg-15',
				'ctg-16',
				'ctg-17',
				'ctg-19',
				'ctg-20',
				'ctg-23',
				'ctg-24',
				'ctg-26',
				'ctg-27',
				'ctg-29',
				'ctg-31'
			],
			categories: [
				{ id: 'ctg-1', name: 'Transportation', type: 'exp', icon: 'icon_127' },
				{ id: 'ctg-21', name: 'Gas', type: 'exp', icon: 'icon_129' },
				{ id: 'ctg-3', name: 'Shopping', type: 'exp', icon: 'icon_7' },
				{ id: 'ctg-4', name: 'Clothing', type: 'exp', icon: 'icon_17' },
				{ id: 'ctg-5', name: 'Footwear', type: 'exp', icon: 'icon_100' },
				{ id: 'ctg-7', name: 'Groceries', type: 'exp', icon: 'icon_3' },
				{ id: 'ctg-8', name: 'Lover & Friends', type: 'exp', icon: 'icon_148' },
				//  { id: 'ctg-9', name: 'Beverage', type: 'exp', icon: 'icon_116' },
				{ id: 'ctg-10', name: 'Personal Care', type: 'exp', icon: 'icon_132' },
				{ id: 'ctg-15', name: 'Internet', type: 'exp', icon: 'icon_126' },
				{ id: 'ctg-16', name: 'Phone', type: 'exp', icon: 'icon_134' },
				{ id: 'ctg-17', name: 'Electricity', type: 'exp', icon: 'icon_125' },
				{ id: 'ctg-19', name: 'Rent', type: 'exp', icon: 'icon_136' },
				{ id: 'ctg-20', name: 'Installments', type: 'exp', icon: 'icon_112' },
				{ id: 'ctg-23', name: 'Doctor', type: 'exp', icon: 'icon_145' },
				{ id: 'ctg-24', name: 'Pharmacy', type: 'exp', icon: 'icon_146' },
				{ id: 'ctg-26', name: 'Home', type: 'exp', icon: 'icon_115' },
				{ id: 'ctg-27', name: 'Children & Babies', type: 'exp', icon: 'icon_38' },
				{ id: 'ctg-29', name: 'Pets', type: 'exp', icon: 'icon_123' },
				{ id: 'ctg-31', name: 'Others', type: 'exp', icon: 'icon_23' }
			]
		},
		'jar-2': {
			id: 'jar-2',
			title: 'Play',
			percentage: 10,
			categoriesIds: [
				'ctg-6',
				'ctg-11',
				'ctg-12',
				'ctg-13',
				'ctg-14',
				'ctg-18',
				'ctg-28',
				'ctg-2'
			],
			categories: [
				{ id: 'ctg-6', name: 'Electronics', type: 'exp', icon: 'icon_9' },
				{ id: 'ctg-11', name: 'Café', type: 'exp', icon: 'icon_105' },
				{ id: 'ctg-12', name: 'Restaurants', type: 'exp', icon: 'icon_133' },
				{ id: 'ctg-13', name: 'Movies', type: 'exp', icon: 'icon_6' },
				{ id: 'ctg-14', name: 'Entertainment', type: 'exp', icon: 'icon_49' },
				{ id: 'ctg-18', name: 'Cable', type: 'exp', icon: 'icon_84' },
				{ id: 'ctg-28', name: 'Decorations', type: 'exp', icon: 'icon_21' },
				{ id: 'ctg-2', name: 'Travel', type: 'exp', icon: 'icon_5' }
			]
		},
		'jar-3': {
			id: 'jar-3',
			title: 'Personal Growth',
			percentage: 10,
			categoriesIds: [ 'ctg-22', 'ctg-30' ],
			categories: [
				{ id: 'ctg-22', name: 'Gym & Sports', type: 'exp', icon: 'icon_70' },
				{ id: 'ctg-30', name: 'Education', type: 'exp', icon: 'icon_113' }
			]
		},
		'jar-4': {
			id: 'jar-4',
			title: 'Give',
			percentage: 5,
			categoriesIds: [ 'ctg-25' ],
			categories: [ { id: 'ctg-25', name: 'Charity', type: 'exp', icon: 'icon_149' } ]
		}
	}
};

const transactions = [
	{
		amount: 10000,
		category: {
			name: 'Salary'
		},
		date: set(new Date(), { date: 28 }),
		description: '',
		type: 'inc'
	},
	{
		amount: -1300,
		category: {
			name: 'Groceries'
		},
		date: set(new Date(), { date: 12 }),
		description: `For next week's party`,
		type: 'exp'
	},
	{
		amount: -250,
		category: {
			name: 'Café'
		},
		date: set(new Date(), { date: 8 }),
		description: ``,
		type: 'exp'
	}
	// {
	// 	amount: 3500,
	// 	category: {
	// 		name: 'Initial balance'
	// 	},
	// 	date: set(new Date(), { date: 29 }),
	// 	description: '',
	// 	type: 'inc'
	// },
	// {
	// 	amount: -70,
	// 	category: {
	// 		name: 'Transportation'
	// 	},
	// 	date: set(new Date(), { date: 4 }),
	// 	description: 'Uber',
	// 	type: 'exp'
	// },
	// {
	// 	amount: -700,
	// 	category: {
	// 		name: 'Clothing'
	// 	},
	// 	date: set(new Date(), { date: 15 }),
	// 	description: 'Bought a new jeans',
	// 	type: 'exp'
	// },
	// {
	// 	amount: -450,
	// 	category: {
	// 		name: 'Gas'
	// 	},
	// 	date: set(new Date(), { date: 6 }),
	// 	description: '',
	// 	type: 'exp'
	// },
	// {
	// 	amount: -90,
	// 	category: {
	// 		name: 'Food'
	// 	},
	// 	date: set(new Date(), { date: 7 }),
	// 	description: `Ordered food while at work`,
	// 	type: 'exp'
	// },
	// {
	// 	amount: -350,
	// 	category: {
	// 		name: 'Phone',
	// },
	// 	date: set(new Date(), { date: 7 }),
	// 	description: 'Phone bill',
	// 	type: 'exp'
	// },
	// {
	// 	amount: -250,
	// 	category: {
	// 		name: 'Transportation',
	// },
	// 	date: set(new Date(), { date: 20 }),
	// 	description: 'Transportation to dahab',
	// 	type: 'exp'
	// },
	// {
	// 	amount: -6500,
	// 	category: {
	// 		name: 'Rent',
	// },
	// 	date: set(new Date(), { date: 3 }),
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
