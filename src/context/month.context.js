import React, { createContext, useState } from 'react';
import startOfMonth from 'date-fns/startOfMonth';
import getUnixTime from 'date-fns/getUnixTime';

export const MonthContext = createContext();
export const ParsedMonthContext = createContext();
export const SetMonthContext = createContext();

export function MonthProvider(props) {
	const [ month, setMonth ] = useState(new Date());
	const parsedMonth = getUnixTime(startOfMonth(month));

	return (
		<MonthContext.Provider value={month}>
			<ParsedMonthContext.Provider value={parsedMonth}>
				<SetMonthContext.Provider value={setMonth}>
					{props.children}
				</SetMonthContext.Provider>
			</ParsedMonthContext.Provider>
		</MonthContext.Provider>
	);
}
