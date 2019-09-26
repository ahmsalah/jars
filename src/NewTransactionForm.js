import React, { Component } from 'react';
import uuid from 'uuid/v4';

export class NewTransactionForm extends Component {
	constructor(props) {
		super(props);
		const date = new Date();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const year = date.getFullYear();
		const curDate = `${year}-${month}-${day}`;
		console.log(curDate);

		this.state = {
			name: '',
			amount: '',
			date: curDate,
			note: ''
		};
	}

	handleSubmit = evt => {
		evt.preventDefault();
		const transaction = { ...this.state, id: uuid() };
		this.props.addTransaction(transaction);
		this.setState({ name: '', amount: '', note: '' });
	};

	handleChange = evt => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	render() {
		const { name, amount, date, note } = this.state;
		return (
			<form className="NewTransactionForm" onSubmit={this.handleSubmit}>
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
				<label htmlFor="note">Notes </label>
				<input
					type="text"
					placeholder="Notes"
					id="note"
					name="note"
					value={note}
					onChange={this.handleChange}
				/>
				<button>Add</button>
			</form>
		);
	}
}

export default NewTransactionForm;
