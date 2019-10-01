import { useState } from 'react';
function useToggle(initalVal = false) {
	// call useState, "reserve/setup piece of state"
	const [ state, setState ] = useState(initalVal);
	const toggle = () => {
		setState(!state);
	};
	// return piece of state AND a function to toggle it
	return [ state, toggle ];
}

export default useToggle;
