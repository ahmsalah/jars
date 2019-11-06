import React, { useContext } from 'react';
import firebase from '../firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { initialCategories, initialTransactions } from '../initialData';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSpring, animated } from 'react-spring';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	'@global': {
		body: {
			background: 'radial-gradient(circle, rgba(45,45,50,1) 75%, rgba(35,35,39,1) 100%)',
			overflow: 'hidden'
		}
	},

	root: {
		display: 'flex',
		justifyContent: 'center',
		width: '100vw',
		height: '100vh',
		color: '#fff'
	},
	left: {
		padding: spacing(15, 4, 10),
		[breakpoints.up('cmp')]: {
			padding: spacing(15, 10, 10),
			minWidth: 500,
			maxWidth: '50%'
		},
		[breakpoints.up('md')]: {
			padding: spacing(17, 13, 10)
		},
		[breakpoints.up('lg')]: {
			padding: spacing(17, 15, 10)
		}
	},
	typography: {
		zIndex: 50,
		maxWidth: '40ch',
		fontWeight: 400,
		marginBottom: 20,
		fontSize: '1rem',
		[breakpoints.up('lg')]: {
			fontSize: '1.15rem',
			marginBottom: 30
		}
	},
	signIn: {
		margin: spacing(7, 0, 2)
	},
	container: {
		flex: 1,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		[breakpoints.up('lg')]: {
			paddingRight: 100,
			paddingLeft: 100
		},
		'& > *': {
			position: 'absolute',
			borderRadius: 5,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat',
			willChange: 'transform'
		}
	},
	hand: {
		width: prlx => prlx.handWidth,
		height: prlx => `calc(${prlx.handWidth} * 0.2366)`,
		backgroundImage: `url(${require('../assets/hand.png')})`
	},
	coin: {
		width: prlx => prlx.handWidth,
		height: prlx => `calc(${prlx.handWidth} * 0.2366)`,
		backgroundImage: `url(${require('../assets/coin.png')})`
	},
	jarRight: {
		width: prlx => prlx.jarWidth,
		height: prlx => `calc(${prlx.jarWidth} * 0.5267)`,
		backgroundImage: `url(${require('../assets/jar-right.png')})`
	},
	jarLeft: {
		width: prlx => prlx.jarWidth,
		height: prlx => `calc(${prlx.jarWidth} * 0.5267)`,
		backgroundImage: `url(${require('../assets/jar-left.png')})`
	},
	jarMiddle: {
		width: prlx => prlx.jarWidth,
		height: prlx => `calc(${prlx.jarWidth} * 0.5267)`,
		backgroundImage: `url(${require('../assets/jar-middle.png')})`
	},
	savingJars: {
		width: prlx => prlx.savingJarsWidth,
		height: prlx => `calc(${prlx.savingJarsWidth} * 0.5325)`,
		backgroundImage: `url(${require('../assets/saving-jars.png')})`,
		position: 'absolute',
		borderRadius: 5,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		willChange: 'transform',
		top: 15,
		left: prlx => `calc(51% - ${prlx.savingJarsWidth} / 2)`
	},
	bottom: {
		backgroundColor: '#373741',
		width: '140%',
		height: '25vh',
		position: 'absolute',
		bottom: 0,
		left: 0,
		boxShadow: '0px -8px 12px 0px rgba(0,0,0,0.1), inset 0px 4px 20px 20px rgba(0,0,0,0.1)',
		zIndex: -1
	}
}));

function Login() {
	const greaterThan1200 = useMediaQuery('(min-width:1200px)');
	const greaterThan1000 = useMediaQuery('(min-width:1000px)');
	const greaterThan800 = useMediaQuery('(min-width:800px)');
	const greaterThan600 = useMediaQuery('(min-width:600px)');

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

	const prlx = { handWidth, jarWidth, savingJarsWidth };

	const calc = (x, y) => [ x - window.innerWidth / 2, y - window.innerHeight / 2 ];
	const transHand = (x, y) =>
		`translate3d(${x / 4 + (greaterThan1200 ? 340 : 220)}px,${y / 4.5 -
			(greaterThan1000 ? 150 : 100)}px,0)`;
	const transCoin = (x, y) =>
		`translate3d(${x / 4 + (greaterThan1200 ? 340 : 220)}px,${y / 4.5 -
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
	const classes = useStyles(prlx);

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
						categories: initialCategories
					});

					initialTransactions.map(tr =>
						userRef.collection('transactions').add({
							category: tr.category,
							amount: tr.amount,
							dateTimestamp: tr.date,
							description: tr.description,
							type: tr.type,
							icon: tr.icon
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
		<div
			className={classes.root}
			onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
			<animated.div
				className={classes.savingJars}
				style={{ transform: props.xy.interpolate(transSavingJars) }}
			/>
			{greaterThan800 && <span className={classes.bottom} />}
			<div className={classes.left}>
				<Typography variant="h6" className={classes.typography}>
					Save and manage your personal money and keep track of your day to day in-and-out
					transactions, create budgets that you can actually stick to.
				</Typography>
				<Typography variant="h6" className={classes.typography}>
					Use traditional budgets or, better, the JARS money management system.
				</Typography>
				<Typography variant="h6" className={classes.typography}>
					Inspired by T. Harv Eker's, New York Times best-selling book, "Secrets of the
					Millionaire Mind".
				</Typography>
				<div className={classes.signIn}>
					<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
				</div>
			</div>
			{greaterThan800 && (
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
