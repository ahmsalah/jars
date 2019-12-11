import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, breakpoints }) => ({
	'@global': {
		body: {
			background: 'radial-gradient(circle, rgba(45,45,50,1) 75%, rgba(35,35,39,1) 100%)',
			overflow: styleProps => (!styleProps.heightUp550 ? 'initial' : 'hidden')
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
		marginBottom: spacing(3),
		fontSize: '1rem',
		[breakpoints.up('lg')]: {
			fontSize: '1.15rem',
			marginBottom: spacing(4)
		}
	},
	signIn: {
		margin: spacing(7, 0)
	},
	container: {
		flex: 1,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		[breakpoints.up('lg')]: {
			paddingRight: spacing(12),
			paddingLeft: spacing(12)
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
		width: styleProps => styleProps.handWidth,
		height: styleProps => `calc(${styleProps.handWidth} * 0.2366)`,
		backgroundImage: `url(${require('../../assets/hand.png')})`
	},
	coin: {
		width: styleProps => styleProps.handWidth,
		height: styleProps => `calc(${styleProps.handWidth} * 0.2366)`,
		backgroundImage: `url(${require('../../assets/coin.png')})`
	},
	jarRight: {
		width: styleProps => styleProps.jarWidth,
		height: styleProps => `calc(${styleProps.jarWidth} * 0.5267)`,
		backgroundImage: `url(${require('../../assets/jar-right.png')})`
	},
	jarLeft: {
		width: styleProps => styleProps.jarWidth,
		height: styleProps => `calc(${styleProps.jarWidth} * 0.5267)`,
		backgroundImage: `url(${require('../../assets/jar-left.png')})`
	},
	jarMiddle: {
		width: styleProps => styleProps.jarWidth,
		height: styleProps => `calc(${styleProps.jarWidth} * 0.5267)`,
		backgroundImage: `url(${require('../../assets/jar-middle.png')})`
	},
	savingJars: {
		width: styleProps => styleProps.savingJarsWidth,
		height: styleProps => `calc(${styleProps.savingJarsWidth} * 0.5325)`,
		backgroundImage: `url(${require('../../assets/saving-jars.png')})`,
		position: 'absolute',
		borderRadius: 5,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		willChange: 'transform',
		top: 15,
		left: styleProps => `calc(51% - ${styleProps.savingJarsWidth} / 2)`
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
