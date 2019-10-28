import React, { useContext } from 'react';
import firebase from '../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { initialCategories, initialTransactions } from '../initialData';

function Login() {
	const currentUser = useContext(AuthContext);
	const uiConfig = {
		signInFlow: 'popup',
		signInSuccessUrl: '/',
		callbacks: {
			signInSuccessWithAuthResult: authResult => {
				const user = firebase.auth().currentUser;
				if (authResult.additionalUserInfo.isNewUser) {
					const userRef = firebase.firestore().collection('users').doc(user.uid);
					userRef.set({
						email: user.email,
						name: user.displayName,
						photoUrl: user.photoURL
					});
					initialCategories.map(ct =>
						userRef.collection('categories').add({
							name: ct.name,
							type: ct.type,
							icon: ct.icon
						})
					);
					initialTransactions.map(tr =>
						userRef.collection('transactions').add({
							category: tr.category,
							amount: tr.amount,
							date: tr.date,
							description: tr.description,
							type: tr.type
						})
					);
				}
			}
		},
		signInOptions: [ firebase.auth.GoogleAuthProvider.PROVIDER_ID ]
	};
	if (currentUser) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		</div>
	);
}

export default Login;
