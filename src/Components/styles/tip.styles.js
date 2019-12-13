import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
	'@keyframes rotate': {
		'0%': {
			transform: 'rotate(0)'
		},
		'46%': {
			transform: 'rotate(0)'
		},
		'49%': {
			transform: 'rotate(-10deg)'
		},
		'51%': {
			transform: 'rotate(10deg)'
		},
		'54%': {
			transform: 'rotate(0)'
		},
		'100%': {
			transform: 'rotate(0)'
		}
	},
	popper: {
		margin: spacing(0, 4),
		[breakpoints.down('xs')]: {
			marginTop: props => (props.modal ? (props.placementTop ? 0 : -25) : 0),
			marginBottom: props => (props.modal ? (!props.placementTop ? 0 : -20) : 0)
		}
	},
	popperNoArrow: {
		transform: 'translate(-50%, -50%) !important',
		position: 'fixed !important',
		top: '50% !important',
		left: '50% !important',
		minWidth: 280,
		margin: '0 !important'
	},
	tooltipNoArrow: {
		marginTop: 50,
		fontSize: '1.1rem !important',
		[breakpoints.up('sm')]: {
			padding: '24px !important'
		}
	},
	tooltip: {
		textAlign: 'center',
		backgroundColor: '#fff',
		color: palette.text.primary,
		padding: spacing(2),
		fontSize: '1rem',
		lineHeight: 1.6
	},
	arrow: {
		color: '#fff'
	},
	background: {
		position: 'fixed',
		zIndex: 1500,
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	buttonContainer: {
		position: 'fixed',
		left: '50%',
		bottom: props => (!props.buttonTop ? '15%' : 'unset'),
		top: props => (props.buttonTop ? '8%' : 'unset'),
		outline: 0,
		transform: 'translateX(-50%)'
	},
	button: {
		position: 'relative',
		color: '#fff',
		animation: '$rotate 6s infinite 1s linear',
		fontSize: '1.5rem',
		padding: spacing(2, 6),
		backgroundColor: 'rgba(0,0,0,0.8)',
		whiteSpace: 'nowrap',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,1)'
		}
	},
	badge: {
		position: 'absolute',
		top: spacing(0.5),
		right: spacing(1.5),
		fontSize: '.8rem',
		fontWeight: 400
	},
	children: {
		'& > *': {
			zIndex: 1600
		}
	}
}));
