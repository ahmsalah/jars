import React, { createContext, useState, useContext, useEffect } from 'react';
import firebase from '../firebase/firebase';
import { AuthContext } from '../context/auth.context';

export const CurrencyContext = createContext();
export const SetCurrencyContext = createContext();

export function CurrencyProvider(props) {
	const currentUser = useContext(AuthContext);
	const [ currency, setCurrency ] = useState('');

	useEffect(
		() => {
			if (currentUser) {
				firebase.firestore().collection('users').doc(currentUser.uid).get().then(doc => {
					let currency;
					if (doc.exists) {
						currency = doc.data().currency;
						setCurrency(currency);
					} else {
						currency = '';
					}
				});
			}
		},
		[ currentUser ]
	);

	const changeCurrency = cur => {
		setCurrency(cur);
		firebase.firestore().collection('users').doc(currentUser.id).update({
			currency: cur
		});
	};

	return (
		<CurrencyContext.Provider value={currency}>
			<SetCurrencyContext.Provider value={changeCurrency}>
				{props.children}
			</SetCurrencyContext.Provider>
		</CurrencyContext.Provider>
	);
}
