import React, { Component } from 'react';
import uuid from 'uuid/v4';
import BtnSwitch from './BtnSwitch';
import './NewCategoryForm.css';

export class NewCategoryForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			type: '',
			expense: true
		};
	}

	handleSubmit = evt => {
		evt.preventDefault();
		const type = this.state.expense ? 'exp' : 'inc';
		const newCategory = { name: this.state.name, id: uuid(), type: type };
		this.props.addCategory(newCategory, type);
		this.setState({ name: '' });
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
		return (
			<form className="NewCategoryForm" onSubmit={this.handleSubmit}>
				<label htmlFor="name">New Category </label>
				<input
					type="text"
					placeholder="Category Name"
					id="name"
					name="name"
					value={this.state.name}
					onChange={this.handleChange}
					required
				/>
				<BtnSwitch toggleExpense={this.toggleExpense} />
				<button>Add</button>
			</form>
		);
	}
}

export default NewCategoryForm;
