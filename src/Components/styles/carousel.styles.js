import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
	root: {
		height: '100%',
		width: '100%',
		color: '#fff',
		'& > div > div': {
			height: '100%'
		}
	},
	slide: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& > div': {
			margin: spacing(2),
			minHeight: '60%',
			maxHeight: '65%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}
	},
	slide1: {
		backgroundColor: palette.primary.main
	},
	slide2: {
		backgroundColor: palette.secondary.main
	},
	slide3: {
		backgroundColor: '#2196f3'
	},
	ctaContainer: {
		maxHeight: '35%',
		display: 'flex',
		flexDirection: 'column',
		position: 'fixed',
		width: '100%',
		bottom: 0,
		left: 0,
		[breakpoints.up('sm')]: {
			alignItems: 'center',
			padding: spacing(6, 4, 7)
		}
	},
	button: {
		whiteSpace: 'nowrap',
		fontSize: '1.5rem',
		borderRadius: 'unset',
		padding: spacing(2, 6),
		[breakpoints.up('sm')]: {
			borderRadius: 4
		}
	},
	paginationContainer: {
		alignSelf: 'center',
		display: 'flex',
		marginBottom: spacing(2)
	},
	pagination: {
		height: spacing(1.5),
		width: spacing(1.5),
		borderRadius: '50%',
		transition: 'all .5s'
	},
	pgColor: {
		backgroundColor: palette.grey[300]
	},
	pgActive: {
		backgroundColor: '#fff',
		transform: 'scale(1.125)'
	},
	paper: {
		overflow: 'hidden',
		width: '100%',
		maxWidth: 450
	},
	list: {
		padding: 0
	},
	slideTitle: {
		margin: props => (props.heightUp600 ? spacing(7, 2, 5) : spacing(3, 2, 5)),
		fontSize: '1.4rem',
		[breakpoints.up('sm')]: {
			fontSize: '1.6rem'
		}
	},
	imgContainer: {
		margin: spacing(0, 3),
		padding: spacing(1.5, 2, 1),
		maxWidth: 380
	},
	imgBudget: {
		width: '100%',
		maxHeight: '40vh',
		objectFit: 'contain'
	},
	imgChart: {
		width: '100%',
		maxHeight: '30vh',
		objectFit: 'contain'
	},
	chartCaption: {
		margin: spacing(1, 2, 0.5)
	}
}));
