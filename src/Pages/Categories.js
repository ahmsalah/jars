import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import './Categories.css';
import CategoryList from '../Components/CategoryList';

export class Categories extends Component {
	render() {
		const { expCategories, incCategories, addCategory, removeCategory } = this.props;
		return (
			<div className="Categories">
				<Navbar display="categories" addCategory={addCategory} />
				<div className="Categories__content">
					<CategoryList
						expCategories={expCategories}
						incCategories={incCategories}
						removeCategory={removeCategory}
					/>
				</div>
			</div>
		);
	}
}

export default Categories;
