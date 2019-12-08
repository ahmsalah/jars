import React, { useContext } from 'react';
import firebase from '../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import {
	initialCategories,
	initialTransactions,
	initialBudgets,
	initialJars
} from '../initialData';
import useStyles from '../components/styles/login.styles';
import Typography from '@material-ui/core/Typography';
import { useSpring, animated } from 'react-spring';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function Login() {
	const heightUp550 = useMediaQuery('(min-height:550px)');
	const up1200 = useMediaQuery('(min-width:1200px)');
	const up1000 = useMediaQuery('(min-width:1000px)');
	const up800 = useMediaQuery('(min-width:800px)');
	const handWidth = (up1200 && '65em') || (up1000 && '60em') || (up800 && '50em') || '45em';
	const jarWidth = (up1200 && '47em') || (up1000 && '38em') || (up800 && '33em') || '30em';
	const savingJarsWidth = (up1200 && '15em') || (up1000 && '12em') || (up800 && '10em') || '10em';

	const styleProps = { handWidth, jarWidth, savingJarsWidth, heightUp550 };

	const calc = (x, y) => [ x - window.innerWidth / 2, y - window.innerHeight / 2 ];
	const transHand = (x, y) =>
		`translate3d(${x / 3 + (up1200 ? 340 : 220)}px,${y / 4.5 - (up1000 ? 150 : 100)}px,0)`;
	const transCoin = (x, y) =>
		`translate3d(${x / 3 + (up1200 ? 340 : 220)}px,${y / 4.5 - (up1000 ? 150 : 100)}px,0)`;
	const transJarRight = (x, y) =>
		`translate3d(${x / 9 + (up1200 ? -20 : -50)}px,${y / 11 + (up1200 ? 125 : 150)}px,0)`;
	const transJarMiddle = (x, y) =>
		`translate3d(${x / 10 + (up1200 ? -20 : -50)}px,${y / 11 + (up1200 ? 125 : 150)}px,0)`;
	const transJarLeft = (x, y) =>
		`translate3d(${x / 12 + (up1200 ? -20 : -50)}px,${y / 11 + (up1200 ? 125 : 150)}px,0)`;
	const transSavingJars = (x, y) => `translate3d(${x / 35}px,${y / 30}px,0)`;

	const currentUser = useContext(AuthContext);
	const classes = useStyles(styleProps);

	const [ props, set ] = useSpring(() => ({
		xy: [ 0, 0 ],
		config: { mass: 10, tension: 550, friction: 140 }
	}));

	const uiConfig = {
		signInFlow: 'popup',
		signInSuccessUrl: '/',
		callbacks: {
			signInSuccessWithAuthResult: authResult => {
				const user = firebase.auth().currentUser;
				const userRef = firebase.firestore().collection('users').doc(user.uid);

				if (authResult.additionalUserInfo.isNewUser) {
					userRef.set({
						email: user.email,
						name: user.displayName,
						photoUrl: user.photoURL,
						categories: initialCategories,
						jars: initialJars,
						isNewUser: authResult.additionalUserInfo.isNewUser
					});

					initialTransactions.map(tr =>
						userRef.collection('transactions').add({
							category: tr.category,
							amount: tr.amount,
							dateTimestamp: tr.date,
							description: tr.description,
							type: tr.type
						})
					);

					Object.entries(initialBudgets).map(([ key, val ], i) =>
						userRef.collection('budgets').doc(key).set(val)
					);
				} else {
					userRef.update({
						isNewUser: authResult.additionalUserInfo.isNewUser
					});
				}
			}
		},
		signInOptions: [ firebase.auth.GoogleAuthProvider.PROVIDER_ID ]
	};

	if (currentUser) {
		return <Redirect to="/" />;
	}
	return (
		<div
			className={classes.root}
			onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
			<animated.div
				className={classes.savingJars}
				style={{ transform: props.xy.interpolate(transSavingJars) }}
			/>
			{up800 && heightUp550 && <span className={classes.bottom} />}
			<div className={classes.left}>
				<Typography variant="h6" className={classes.typography}>
					Save and manage your personal money and keep track of your day to day in-and-out
					transactions.
				</Typography>
				<Typography variant="h6" className={classes.typography}>
					Create budgets that you can actually stick to and utilize the JARS money
					management system.
				</Typography>
				<Typography variant="h6" className={classes.typography}>
					Inspired by T. Harv Eker's, New York Times best-selling book, "Secrets of the
					Millionaire Mind".
				</Typography>
				<div className={classes.signIn}>
					<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
				</div>
			</div>
			{up800 &&
			heightUp550 && (
				<div className={classes.container}>
					<animated.div
						className={classes.coin}
						style={{ transform: props.xy.interpolate(transCoin) }}
					/>
					<animated.div
						className={classes.jarRight}
						style={{ transform: props.xy.interpolate(transJarRight) }}
					/>
					<animated.div
						className={classes.jarLeft}
						style={{ transform: props.xy.interpolate(transJarLeft) }}
					/>
					<animated.div
						className={classes.jarMiddle}
						style={{ transform: props.xy.interpolate(transJarMiddle) }}
					/>
					<animated.div
						className={classes.hand}
						style={{ transform: props.xy.interpolate(transHand) }}
					/>
				</div>
			)}
		</div>
	);
}

export default Login;
