import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, breakpoints, palette }) => ({
	root: {
		margin: spacing(0, 0, 3),
		overflow: 'hidden'
	},
	summary: {
		justifyItems: 'flex-start',
		padding: 0,
		minHeight: '0 !important',
		'& > div': {
			display: 'block',
			margin: '0 0 8px !important'
		}
	},
	progressBar: {
		height: 6,
		'& > div': {
			transition: 'transform .8s linear'
		}
	},
	titleContainer: {
		flex: 1,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		[breakpoints.up('sm')]: {
			padding: spacing(1, 2, 0, 3)
		},
		padding: spacing(1, 1.5, 0, 2)
	},
	title: {
		fontWeight: 500,
		textTransform: 'capitalize',
		paddingRight: spacing(1),
		marginRight: 'auto'
	},
	titleDefault: {
		color: palette.text.secondary,
		fontSize: '.9rem'
	},
	iconsContainer: {
		display: 'flex'
	},
	iconButton: {
		padding: 5
	},
	dragButton: {
		padding: 0,
		'&: active': {
			cursor: 'grabbing !important'
		}
	},
	expandButton: {
		'& svg': {
			width: '1.2em',
			height: '1.2em'
		},
		padding: 3,
		transform: props => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'),
		transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
	},
	summaryAmountsContainer: {
		display: 'flex',
		padding: spacing(1, 2, 0),
		textAlign: 'center'
	},
	expansionPanelDetails: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: 0
	},
	left: {
		flex: 0.7,
		padding: spacing(2, 1, 2, 2),
		[breakpoints.up('sm')]: {
			padding: spacing(2, 4, 2, 3)
		}
	},
	right: {
		flex: 0.3,
		padding: spacing(2, 1, 2),
		[breakpoints.up('sm')]: {
			padding: spacing(2, 4, 2)
		}
	},
	categoriesContainer: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		borderRadius: 20,
		height: '100%',
		'& > *': {
			margin: spacing(0.5)
		}
	},
	noCategoriesContainer: {
		position: 'absolute',
		padding: spacing(2),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		maxWidth: 200
	},
	chip: {
		backgroundColor: '#fff',
		'&:active': {
			cursor: 'grabbing !important'
		}
	}
}));
