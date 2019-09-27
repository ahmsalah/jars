import React, { Component } from 'react';
import uuid from 'uuid/v4';
import BtnSwitch from './BtnSwitch';
import './NewCategoryForm.css';

export class NewCategoryForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categoryName: '',
			expense: true
		};
	}

	handleSubmit = evt => {
		evt.preventDefault();
		this.props.addCategory(this.state.categoryName);
		this.setState({ categoryName: '' });
	};

	handleChange = evt => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	handleCheck = () => {
		this.setState({ expense: !this.state.expense });
	};

	render() {
		return (
			<form className="NewCategoryForm" onSubmit={this.handleSubmit}>
				<label htmlFor="categoryName">New Category </label>
				<input
					type="text"
					placeholder="Category Name"
					id="categoryName"
					name="categoryName"
					value={this.state.categoryName}
					onChange={this.handleChange}
					required
				/>
				<BtnSwitch onChange={this.handleCheck} />
				<button>Add</button>
			</form>
		);
	}
}

export default NewCategoryForm;
