import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, breakpoints }) => ({
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
		padding: spacing(1, 2, 0, 3),
		flex: 1,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	title: {
		fontWeight: 500
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
		padding: spacing(2, 4, 2, 3),
		flex: 0.7
	},
	right: {
		flex: 0.3,
		padding: spacing(2, 4, 2, 4)
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
	chip: {
		backgroundColor: '#fff',
		'&:active': {
			cursor: 'grabbing !important'
		}
	}
}));
