import React, { createContext, useReducer, useContext, useEffect } from 'react';
import tipsReducer from '../reducers/tips.reducer';
import firebase from '../firebase/firebase';
import { AuthContext } from '../context/auth.context';

export const TipsContext = createContext();
export const DispatchTipsContext = createContext();

export function TipsProvider(props) {
	const currentUser = useContext(AuthContext);
	const [ showTips, dispatchTips ] = useReducer(tipsReducer, {});

	useEffect(
		() => {
			if (currentUser) {
				const unsubscribe = firebase
					.firestore()
					.collection('users')
					.doc(currentUser.uid)
					.onSnapshot(doc => {
						const showTips = doc.data().showTips;
						dispatchTips({
							type: 'SET_TIPS',
							showTips
						});
					});
				return () => unsubscribe();
			}
		},
		[ currentUser ]
	);

	return (
		<TipsContext.Provider value={showTips}>
			<DispatchTipsContext.Provider value={dispatchTips}>
				{props.children}
			</DispatchTipsContext.Provider>
		</TipsContext.Provider>
	);
}
