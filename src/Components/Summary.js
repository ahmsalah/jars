import React, { Component } from 'react';
import './Summary.css';
import { sumTotal } from '../helpers';

export class Summary extends Component {
	render() {
		const { inc, exp } = this.props;
		const total = sumTotal(inc) + sumTotal(exp);
		return (
			<div className="Summary">
				<div className="Summary__inc">
					<span>Income </span>
					<span className="Summary__amount Summary__amount--inc">{sumTotal(inc)}</span>
				</div>
				<div className="Summary__exp">
					<span>Expenses </span>
					<span className="Summary__amount Summary__amount--exp">{sumTotal(exp)}</span>
				</div>
				<div className="underline" />
				<div className="Summary__total">
					<span className="Summary__amount Summary__amount--total">{total}</span>
				</div>
			</div>
		);
	}
}

export default Summary;
