import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthContext } from '../context/auth.context';
import firebase from '../firebase/firebase';
import jarsReducer from '../reducers/jars.reducer';

export const JarsContext = createContext();
export const DispatchContext = createContext();

export function JarsProvider(props) {
	const [ jars, dispatch ] = useReducer(jarsReducer, {});
	const currentUser = useContext(AuthContext);

	useEffect(
		() => {
			if (currentUser) {
				firebase.firestore().collection('users').doc(currentUser.uid).get().then(doc => {
					let jars;
					if (doc.exists) {
						jars = doc.data().jars;
					} else {
						jars = [];
					}
					dispatch({ type: 'SET_JARS', jars });
				});
			}
		},
		[ currentUser ]
	);

	return (
		<JarsContext.Provider value={jars}>
			<DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
		</JarsContext.Provider>
	);
}
