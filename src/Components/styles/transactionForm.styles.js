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
	dialogTitle: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: `${spacing(2, 3, 0)} !important`,
		[breakpoints.up('sm')]: {
			padding: `${spacing(2, 3)} !important`
		}
	},
	helpIconButton: {
		justifySelf: 'center',
		padding: spacing(1),
		marginTop: spacing(-1),
		marginBottom: spacing(2),
		[breakpoints.up('sm')]: {
			marginBottom: spacing(0)
		},
		'& svg': {
			width: '1.3em',
			height: '1.3em'
		}
	},
	dialogContent: {
		maxWidth: spacing(67.5)
	},
	expansionPanelContainer: {
		margin: spacing(0, 1.25, 2.5)
	},
	switch: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	},
	margin: {
		margin: `8px !important`
	},
	inputsContainer: {
		marginTop: spacing(1),
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
	datePicker: {
		cursor: 'pointer'
	},
	menuItem: {
		padding: spacing(0.5, 2)
	},
	avatar: {
		marginRight: spacing(1)
	}
}));
