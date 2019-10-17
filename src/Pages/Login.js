import React, { useContext } from 'react';
import firebase from '../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { withRouter, Redirect } from 'react-router-dom';
import { AuthContext } from '../Auth';

function Login({ history }) {
	const uiConfig = {
		// Popup signin flow rather than redirect flow.
		signInFlow: 'popup',
		// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
		// signInSuccessUrl: '/',
		callbacks: {
			// 	// Avoid redirects after sign-in.
			// signInSuccessWithAuthResult: () => {
			// history.push('/');
			// }
			signInSuccessWithAuthResult: () => {
				history.push('/');
			}
		},
		signInOptions: [ firebase.auth.GoogleAuthProvider.PROVIDER_ID ]
	};
	const { currentUser } = useContext(AuthContext);
	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<StyledFirebaseAuth
				uiConfig={uiConfig}
				firebaseAuth={firebase.auth()}
			/>
		</div>
	);
}

export default withRouter(Login);
