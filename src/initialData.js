import uuid from 'uuid/v4';

export const initialCategories = [
	{ id: uuid(), name: 'Groceries', type: 'exp' },
	{ id: uuid(), name: 'Internet', type: 'exp' },
	{ id: uuid(), name: 'Phone', type: 'exp' },
	{ id: uuid(), name: 'Transportation', type: 'exp' },
	{ id: uuid(), name: 'Gas', type: 'exp' },
	{ id: uuid(), name: 'Electricity', type: 'exp' },
	{ id: uuid(), name: 'Shopping', type: 'exp' },
	{ id: uuid(), name: 'Food', type: 'exp' },
	{ id: uuid(), name: 'Pay off debt', type: 'exp' },
	{ id: uuid(), name: 'Installment', type: 'exp' },

	{ id: uuid(), name: 'Initial balance', type: 'inc' },
	{ id: uuid(), name: 'Salary', type: 'inc' },
	{ id: uuid(), name: 'Savings', type: 'inc' },
	{ id: uuid(), name: 'Bonus', type: 'inc' },
	{ id: uuid(), name: 'Others', type: 'inc' },
	{ id: uuid(), name: 'Gifts', type: 'inc' },
	{ id: uuid(), name: 'Interest money', type: 'inc' }
];

export const initialTransactions = [
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
		date: new Date('2019-10-06'),
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
		date: new Date('2019-10-06'),
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
		date: new Date('2019-10-15'),
		description: '',
		id: uuid(),
		type: 'exp'
	},
	{
		amount: -3000,
		category: 'Pay off debt',
		date: new Date('2019-10-25'),
		description: '',
		id: uuid(),
		type: 'exp'
	}
];
