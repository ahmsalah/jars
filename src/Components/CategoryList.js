import React, { Component } from 'react';
import './CategoryList.css';
import Category from './Category';

export class CategoryList extends Component {
	render() {
		return (
			<div className="CategoryList">
				<div className="CategoryList__list CategoryList__list--exp">
					<h3 className="CategoryList__title">Expenses</h3>

					{this.props.expCategories.map(ct => (
						<Category
							key={ct.id}
							id={ct.id}
							name={ct.name}
							type={ct.type}
							removeCategory={this.props.removeCategory}
						/>
					))}
				</div>

				<div className="CategoryList__list CategoryList__list--inc">
					<h3 className="CategoryList__title">Income</h3>

					{this.props.incCategories.map(ct => (
						<Category
							key={ct.id}
							id={ct.id}
							name={ct.name}
							type={ct.type}
							removeCategory={this.props.removeCategory}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default CategoryList;
