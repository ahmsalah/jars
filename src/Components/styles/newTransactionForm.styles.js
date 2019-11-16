import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, breakpoints }) => ({
	dialog: {
		'& > div > div': {
			maxWidth: 320,
			[breakpoints.up('sm')]: {
				maxWidth: 600
			}
		}
	},
	dialogContent: {
		maxWidth: 488
	},
	expansionPanelContainer: {
		margin: spacing(0, 1.5)
	},
	switch: {
		margin: spacing(2.5, 0, 1),
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	},
	margin: {
		margin: spacing(1)
	},
	inputsContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
		// maxWidth: 440
	},
	textField: {
		width: 200,
		minWidth: 180,
		maxHeight: 56,
		'& div': {
			maxHeight: 56,
			'& img': {
				height: '90%',
				width: '90%'
			}
		}
	},
	textFieledSelect: {
		'& div': {
			display: 'flex',
			alignItems: 'center'
		}
	},
	menuItem: {
		padding: spacing(0.5, 2)
	},
	avatar: {
		margin: spacing(0, 2, 0, 0)
	}
}));
