import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette, spacing, breakpoints, shape }) => ({
	root: {
		padding: spacing(3, 2),
		width: '100%'
	},
	flex: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	noTransactionsWrapper: {
		maxWidth: 600
	},
	typography: {
		textAlign: 'center',
		marginBottom: spacing(2),
		[breakpoints.up('sm')]: {
			fontSize: '2rem'
		}
	},
	jarsImg: {
		filter: 'grayscale(70%)',
		width: '100%',
		maxWidth: spacing(70),
		marginTop: spacing(1)
	},
	chartContainer: {
		position: 'relative',
		width: '100%',
		maxWidth: 600,
		margin: spacing(2, 0)
	},
	titleContainer: {
		padding: spacing(0, 3)
	},
	title: {
		padding: spacing(2, 0, 1.5),
		fontWeight: 600
	},
	selectedMonth: {
		padding: spacing(1, 4)
	},
	tabsButtons: {
		padding: spacing(2, 4),
		'& > div': {
			border: '1px solid',
			borderColor: palette.primary.main,
			borderRadius: shape.borderRadius
		}
	},
	tabButton: {
		zIndex: 5,
		color: palette.primary.main,
		minHeight: spacing(5)
	},
	tabIndicator: {
		height: '100%',
		width: '120%',
		marginLeft: -1,
		marginRight: -1
	},
	selectedButton: {
		color: '#fff !important',
		backgroundColor: palette.primary.main
	},
	slide: {
		padding: spacing(4),
		[breakpoints.up('sm')]: {
			padding: spacing(4, 0, 4, 4)
		}
	},
	padding: {
		padding: spacing(2),
		[breakpoints.up('sm')]: {
			padding: spacing(4)
		}
	},
	total: {
		fontSize: '1.7rem',
		fontWeight: 600,
		textAlign: 'center',
		[breakpoints.up('sm')]: {
			fontSize: '2.2rem',
			textAlign: 'left',
			marginBottom: spacing(-7)
		}
	}
}));
