import React, { Component } from 'react';
import './CategoryList.css';

export class Category extends Component {
	handleRemove = () => {
		this.props.removeCategory(this.props.id, this.props.type);
	};

	render() {
		return (
			<div className="CategoryList__category">
				<div className="CategoryList__category-inner">
					<span>{this.props.name}</span>
					<button className="CategoryList__remove-btn" onClick={this.handleRemove}>
						<i className="fas fa-trash" />
					</button>
				</div>
			</div>
		);
	}
}

export default Category;
