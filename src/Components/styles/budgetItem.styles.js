import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
	root: {
		margin: spacing(0, 0, 3),
		overflow: 'hidden'
	},
	expansionPanelDetails: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: 0
	},
	categoriesContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		borderRadius: 20,
		height: '100%',
		'& > *': {
			margin: spacing(0.5)
		}
	},
	left: {
		padding: spacing(2, 4, 2, 3),
		flex: 0.7
	},
	right: {
		flex: 0.3,
		padding: spacing(2, 4, 2, 4)
	},
	title: {
		fontWeight: 500
	},
	titleContainer: {
		padding: spacing(1, 2, 0, 3),
		flex: 1,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
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
	iconButton: {
		padding: 5
	},
	dragButton: {
		'& svg': {
			width: '1.4em',
			height: '1.4em'
		},
		padding: 1,
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
	listItem: {
		padding: 0
	},
	listItemText: {
		marginTop: 2,
		'& > span': {
			fontSize: '0.875rem',
			fontWeight: 400,
			lineHeight: 1.43,
			letterSpacing: '0.01071em'
		},
		'& > p': {
			fontSize: '1rem',
			fontWeight: 500,
			lineHeight: 1.5,
			letterSpacing: '0.00938em',
			color: 'rgba(0, 0, 0, 0.87)'
		}
	},
	progressBar: {
		height: 6,
		'& > div': {
			transition: 'transform .8s linear'
		}
	},
	chip: {
		backgroundColor: '#fff',
		'&:active': {
			cursor: 'grabbing !important'
		}
	},
	summaryAmountsContainer: {
		display: 'flex',
		padding: spacing(1, 2, 0),
		textAlign: 'center'
	}
}));
