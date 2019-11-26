import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, breakpoints }) => ({
	dialog: {
		'& > div > div': {
			maxWidth: spacing(40),
			margin: spacing(3),
			[breakpoints.up('sm')]: {
				maxWidth: spacing(75)
			}
		}
	},
	dialogContent: {
		maxWidth: spacing(67.5)
	},
	expansionPanelContainer: {
		margin: spacing(0, 1.25)
	},
	switch: {
		margin: spacing(2.5, 0, 1),
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	},
	margin: {
		margin: `8px !important`
	},
	inputsContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	textField: {
		width: spacing(27.5),
		minWidth: spacing(22),
		maxHeight: spacing(7),
		'& div': {
			maxHeight: spacing(7),
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
		marginRight: spacing(1)
	}
}));
