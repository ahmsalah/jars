import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import './Categories.css';

export class Categories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expCategories: [],
			incCategories: []
		};
	}

	addCategory = (newCategory, categoryType) => {
		if (categoryType === 'exp') {
			this.setState({ expCategories: [ ...this.state.expCategories, newCategory ] });
		} else if (categoryType === 'inc') {
			this.setState({ incCategories: [ ...this.state.incCategories, newCategory ] });
		}
	};

	render() {
		return (
			<div className="Categories">
				<Navbar display="categories" addCategory={this.addCategory} />
			</div>
		);
	}
}

export default Categories;
