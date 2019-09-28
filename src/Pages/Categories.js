import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import './Categories.css';
import CategoryList from '../Components/CategoryList';

export class Categories extends Component {
	render() {
		const { expCategories, incCategories, addCategory, removeCategory, onSortEnd } = this.props;
		return (
			<div className="Categories">
				<Navbar display="categories" addCategory={addCategory} />
				<div className="Categories__content">
					<div className="Categories__Lists">
						<CategoryList
							axis="y"
							type="exp"
							categoryList={expCategories}
							removeCategory={removeCategory}
							onSortEnd={onSortEnd}
						/>
						<CategoryList
							axis="y"
							type="inc"
							categoryList={incCategories}
							removeCategory={removeCategory}
							onSortEnd={onSortEnd}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Categories;
