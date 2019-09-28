import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './NewTransactionForm.css';
import BtnSwitch from './BtnSwitch';

export class NewTransactionForm extends Component {
	static defaultProps = {
		categories: [ '', 'Gas', 'Salary', 'Taxi' ]
	};
	constructor(props) {
		super(props);
		const date = new Date();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const year = date.getFullYear();
		const curDate = `${year}-${month}-${day}`;

		this.state = {
			category: '',
			description: '',
			expense: true,
			amount: '',
			date: curDate,
			type: ''
			// note: '',
		};
	}

	handleSubmit = evt => {
		evt.preventDefault();
		let transaction;
		let amount = parseInt(this.state.amount);
		if (this.state.expense) {
			transaction = { ...this.state, id: uuid(), amount: amount * -1, type: 'exp' };
		} else {
			transaction = { ...this.state, id: uuid(), amount: amount, type: 'inc' };
		}

		this.props.addTransaction(transaction);
		this.setState({ description: '', amount: '', note: '' });
	};

	handleChange = evt => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	toggleExpense = () => {
		this.setState({ expense: !this.state.expense });
	};

	render() {
		const { category, description, amount, date, expense } = this.state;
		const { expCategories, incCategories } = this.props;
		return (
			<form className="NewTransactionForm" onSubmit={this.handleSubmit}>
				<BtnSwitch toggleExpense={this.toggleExpense} />
				<select name="category" value={category} onChange={this.handleChange} required>
					<option value="">Choose Category</option>
					{expense ? (
						expCategories.map(ct => (
							<option key={ct.id} value={ct.name}>
								{ct.name}
							</option>
						))
					) : (
						incCategories.map(ct => (
							<option key={ct.id} value={ct.name}>
								{ct.name}
							</option>
						))
					)}
				</select>
				<label htmlFor="description">Description </label>
				<input
					type="text"
					placeholder="Description"
					id="description"
					name="description"
					value={description}
					onChange={this.handleChange}
				/>
				<label htmlFor="amount">Amount </label>
				<input
					type="number"
					placeholder="Amount"
					id="amount"
					name="amount"
					value={amount}
					onChange={this.handleChange}
					required
				/>
				<label htmlFor="date">Date </label>
				<input type="date" id="date" name="date" value={date} onChange={this.handleChange} required />
				<button>Add</button>
			</form>
		);
	}
}

export default NewTransactionForm;
