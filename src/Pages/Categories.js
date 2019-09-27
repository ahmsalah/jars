import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import './Categories.css';

export class Categories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: { expense: [], income: [] }
		};
	}

	render() {
		return (
			<div className="Categories">
				<Navbar display="categories" />
			</div>
		);
	}
}

export default Categories;
