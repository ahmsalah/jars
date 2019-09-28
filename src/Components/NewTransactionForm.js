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
			name: '',
			expense: true,
			amount: '',
			date: curDate,
			note: '',
			type: ''
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
		this.setState({ name: '', amount: '', note: '' });
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
		const { category, name, amount, date, note } = this.state;
		return (
			<form className="NewTransactionForm" onSubmit={this.handleSubmit}>
				<select name="category" value={category} onChange={this.handleChange} required>
					{this.props.categories.map(ct => <option value={ct}>{ct}</option>)}
				</select>
				<label htmlFor="name">Name </label>
				<input
					type="text"
					placeholder="Transaction Name"
					id="name"
					name="name"
					value={name}
					onChange={this.handleChange}
					required
				/>

				{/* <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.expense}  /> */}
				<BtnSwitch toggleExpense={this.toggleExpense} />

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
				<input type="date" id="date" name="date" value={date} onChange={this.handleChange} />
				{/* <label htmlFor="note">Notes </label>
				<input
					type="text"
					placeholder="Notes"
					id="note"
					name="note"
					value={note}
					onChange={this.handleChange}
				/> */}
				<button>Add</button>
			</form>
		);
	}
}

export default NewTransactionForm;
