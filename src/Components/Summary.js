import React, { Component } from 'react';
import './Summary.css';

export class Summary extends Component {
	render() {
		const { inc, exp, sumTotal } = this.props;
		// const reducer = (acc, curr) => acc + curr;
		// const totalInc = inc.length > 0 ? inc.reduce(reducer) : 0;
		// const totalExp = exp.length > 0 ? exp.reduce(reducer) : 0;
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
