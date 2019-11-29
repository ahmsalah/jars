import React, { createContext, useState } from 'react';

export const MonthContext = createContext();
export const SetMonthContext = createContext();

export function MonthProvider(props) {
	const [ month, setMonth ] = useState(new Date());

	return (
		<MonthContext.Provider value={month}>
			<SetMonthContext.Provider value={setMonth}>{props.children}</SetMonthContext.Provider>
		</MonthContext.Provider>
	);
}
