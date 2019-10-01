import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../Components/Navbar';
import Summary from '../Components/Summary';
import TransactionsList from '../Components/TransactionsList';
import { sortList, pushToArrays } from '../helpers';
import useToggleState from '../hooks/useToggleState';

function Home({ expCategories, incCategories }) {
	const [ transactions, setTransactions ] = useState([]);
	const [ displayTransactions, setDisplayTransactions ] = useState(transactions);
	const [ expTransactions, setExpTransactions ] = useState([]);
	const [ incTransactions, setIncTransactions ] = useState([]);
	const [ orderBy, setOrderBy ] = useState('date');
	const [ isReversed, toggleIsReversed ] = useToggleState(false);

	useEffect(
		() => {
			const sortedTransactions = sortList(transactions, orderBy, isReversed);
			setDisplayTransactions(sortedTransactions);
		},
		[ orderBy, transactions, isReversed ]
	);

	useEffect(
		() => {
			const [ incArray, expArray ] = pushToArrays(transactions, 'amount');
			setExpTransactions(expArray);
			setIncTransactions(incArray);
		},
		[ transactions ]
	);

	//------ Adding & Removing Transactions -----//
	const addTransaction = newTransaction => {
		isReversed
			? setTransactions([ ...transactions, newTransaction ])
			: setTransactions([ newTransaction, ...transactions ]);
	};

	const removeTransaction = id => {
		const updatedTransactions = transactions.filter(tr => tr.id !== id);
		setTransactions(updatedTransactions);
	};
	//-------------------------------------------//

	//--------- Sorting Transactions ------------//
	const toggleListReverse = () => {
		toggleIsReversed();
	};

	const handleChange = evt => {
		setOrderBy(evt.target.value);
	};
	//-------------------------------------------//

	return (
		<div className="Home">
			<Navbar
				addTransaction={addTransaction}
				expCategories={expCategories}
				incCategories={incCategories}
			/>
			<div className="Home__content">
				<div className="Home__filters-container">
					<label htmlFor="orderBy">Order by:</label>
					<select id="orderBy" value={orderBy} onChange={handleChange}>
						<option value="date">Date</option>
						<option value="amount">Amount</option>
						<option value="category">Category</option>
					</select>
					<button className="Home__btn-reverse" onClick={toggleListReverse}>
						Reverse Order
					</button>
				</div>
				<Summary exp={expTransactions} inc={incTransactions} />

				<TransactionsList
					transactions={displayTransactions}
					removeTransaction={removeTransaction}
				/>
			</div>
		</div>
	);
}

export default Home;

// export class Home extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			transactions: [],
// 			inc: [],
// 			exp: [],
// 			orderBy: 'date'
// 		};
// 	}
// 	componentDidMount() {
// 		this.sortTransactionList();
// 	}

// 	// addTransaction = newTransaction => {
// 	// 	this.setState({ transactions: [ ...this.state.transactions, newTransaction ] }, () => {
// 	// 		this.sortTransactionList();
// 	// 		this.pushToIncExpArray();
// 	// 	});
// 	// };

// 	// removeTransaction = id => {
// 	// 	this.setState(
// 	// 		{
// 	// 			transactions: this.state.transactions.filter(tr => tr.id !== id)
// 	// 		},
// 	// 		() => this.pushToIncExpArray()
// 	// 	);
// 	// };

// 	// pushToIncExpArray = () => {
// 	// 	const [ incArray, expArray ] = pushToArrays(this.state.transactions, 'amount');
// 	// 	this.setState({ inc: incArray, exp: expArray });
// 	// };

// 	/**
// 	 |--------------------------------------------------
// 	 | Sorting Transactions
// 	 |--------------------------------------------------
// 	 */

// 	toggleListReverse = () => {
// 		this.setState({ transactions: this.state.transactions.reverse() });
// 	};

// 	handleChange = evt => {
// 		this.setState(
// 			{
// 				[evt.target.name]: evt.target.value
// 			},
// 			() => this.sortTransactionList()
// 		);
// 	};

// 	sortTransactionList = () => {
// 		const sortedTransactions = sortList(this.state.transactions, this.state.orderBy);
// 		this.setState({ transactions: sortedTransactions });
// 	};
// 	//--------------------------------------------------

// 	render() {
// 		const { transactions, exp, inc, orderBy } = this.state;
// 		const { expCategories, incCategories } = this.props;
// 		return (
// 			// <div className="Home">
// 			// 	<Navbar
// 			// 		addTransaction={this.addTransaction}
// 			// 		expCategories={expCategories}
// 			// 		incCategories={incCategories}
// 			// 	/>
// 			// 	<div className="Home__content">
// 			// 		<div className="Home__filters-container">
// 			// 			<label htmlFor="orderBy">Order by:</label>
// 			// 			<select id="orderBy" name="orderBy" value={orderBy} onChange={this.handleChange}>
// 			// 				<option value="date">date</option>
// 			// 				<option value="amount">amount</option>
// 			// 				<option value="category">category</option>
// 			// 			</select>
// 			// 			<button className="Home__btn-reverse" onClick={this.toggleListReverse}>
// 			// 				Reverse
// 			// 			</button>
// 			// 		</div>
// 			// 		<Summary exp={exp} inc={inc} />
// 			// 		<TransactionsList
// 			// 			transactions={transactions}
// 			// 			removeTransaction={this.removeTransaction}
// 			// 		/>
// 			// 	</div>
// 			// </div>
// 		);
// 	}
// }

// export default Home;
