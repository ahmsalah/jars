import React from 'react';
import './BtnSwitch.css';

function BtnSwitch({ toggleExpense }) {
	const handleChange = () => {
		toggleExpense();
	};

	return (
		<div className="BtnSwitch" onChange={handleChange}>
			<input
				type="radio"
				id="yes"
				name="switch"
				className="BtnSwitch__radio BtnSwitch__radio_yes"
			/>

			<input
				type="radio"
				defaultChecked
				id="no"
				name="switch"
				className="BtnSwitch__radio BtnSwitch__radio_no"
			/>

			<label htmlFor="yes" className="BtnSwitch__label BtnSwitch__label_yes">
				<span className="BtnSwitch__txt">&nbsp;Inc</span>
			</label>

			<label htmlFor="no" className="BtnSwitch__label BtnSwitch__label_no">
				<span className="BtnSwitch__txt">&nbsp;Exp&nbsp;</span>
			</label>
		</div>
	);
}

export default BtnSwitch;
