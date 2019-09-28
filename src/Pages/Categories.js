import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import './Categories.css';
import CategoryList from '../Components/CategoryList';

export class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expCategories: [],
			incCategories: []
		};
	}

	removeCategory = (id, type) => {
		if (type === 'exp') {
			this.setState({ expCategories: this.state.expCategories.filter(ct => ct.id !== id) });
		} else if (type === 'inc') {
			this.setState({ incCategories: this.state.incCategories.filter(ct => ct.id !== id) });
		}
	};

	addCategory = (newCategory, type) => {
		if (type === 'exp') {
			this.setState({ expCategories: [ ...this.state.expCategories, newCategory ] });
		} else if (type === 'inc') {
			this.setState({ incCategories: [ ...this.state.incCategories, newCategory ] });
		}
	};

	render() {
		const { expCategories, incCategories } = this.state;
		return (
			<div className="Categories">
				<Navbar display="categories" addCategory={this.addCategory} />
				<div className="Categories__content">
					<CategoryList
						expCategories={expCategories}
						incCategories={incCategories}
						removeCategory={this.removeCategory}
					/>
				</div>
			</div>
		);
	}
}

export default Categories;
