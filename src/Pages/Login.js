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
	const heightGreaterThan550 = useMediaQuery('(min-height:550px)');
	const greaterThan1200 = useMediaQuery('(min-width:1200px)');
	const greaterThan1000 = useMediaQuery('(min-width:1000px)');
	const greaterThan800 = useMediaQuery('(min-width:800px)');
	const handWidth =
		(greaterThan1200 && '65em') ||
		(greaterThan1000 && '60em') ||
		(greaterThan800 && '50em') ||
		'45em';
	const jarWidth =
		(greaterThan1200 && '47em') ||
		(greaterThan1000 && '38em') ||
		(greaterThan800 && '33em') ||
		'30em';
	const savingJarsWidth =
		(greaterThan1200 && '15em') ||
		(greaterThan1000 && '12em') ||
		(greaterThan800 && '10em') ||
		'10em';

	const styleProps = { handWidth, jarWidth, savingJarsWidth, heightGreaterThan550 };

	const calc = (x, y) => [ x - window.innerWidth / 2, y - window.innerHeight / 2 ];
	const transHand = (x, y) =>
		`translate3d(${x / 3 + (greaterThan1200 ? 340 : 220)}px,${y / 4.5 -
			(greaterThan1000 ? 150 : 100)}px,0)`;
	const transCoin = (x, y) =>
		`translate3d(${x / 3 + (greaterThan1200 ? 340 : 220)}px,${y / 4.5 -
			(greaterThan1000 ? 150 : 100)}px,0)`;
	const transJarRight = (x, y) =>
		`translate3d(${x / 9 + (greaterThan1200 ? -20 : -50)}px,${y / 11 +
			(greaterThan1200 ? 125 : 150)}px,0)`;
	const transJarMiddle = (x, y) =>
		`translate3d(${x / 10 + (greaterThan1200 ? -20 : -50)}px,${y / 11 +
			(greaterThan1200 ? 125 : 150)}px,0)`;
	const transJarLeft = (x, y) =>
		`translate3d(${x / 12 + (greaterThan1200 ? -20 : -50)}px,${y / 11 +
			(greaterThan1200 ? 125 : 150)}px,0)`;
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
				if (authResult.additionalUserInfo.isNewUser) {
					const userRef = firebase.firestore().collection('users').doc(user.uid);

					userRef.set({
						email: user.email,
						name: user.displayName,
						photoUrl: user.photoURL,
						categories: initialCategories,
						jars: initialJars
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
			{greaterThan800 && heightGreaterThan550 && <span className={classes.bottom} />}
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
			{greaterThan800 &&
			heightGreaterThan550 && (
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
