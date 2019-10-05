import React from 'react';
import './Summary.css';
import { sumTotal } from '../helpers';
import Paper from '@material-ui/core/Paper';

function Summary({ inc, exp }) {
	const totalInc = sumTotal(inc);
	const totalExp = sumTotal(exp);
	const total = totalInc + totalExp;

	return (
		<Paper>
			<div className="Summary">
				<div className="Summary__inc">
					<span>Income </span>
					<span className="Summary__amount Summary__amount--inc">
						{totalInc}
					</span>
				</div>
				<div className="Summary__exp">
					<span>Expenses </span>
					<span className="Summary__amount Summary__amount--exp">
						{totalExp}
					</span>
				</div>
				<div className="underline" />
				<div className="Summary__total">
					<span className="Summary__amount Summary__amount--total">
						{total}
					</span>
				</div>
			</div>
		</Paper>
	);
}

export default Summary;
