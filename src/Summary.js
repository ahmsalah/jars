import React, { Component } from 'react';

export class Summary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expenses: [],
			income: [],
			total: 0
		};
	}

	render() {
		return <div />;
	}
}

export default Summary;
