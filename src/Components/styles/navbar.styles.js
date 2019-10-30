import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
	root: {
		backgroundColor: palette.tertiary[2],
		zIndex: 280,
		boxShadow:
			'0px 2px 2px -1px rgba(0,0,0,0.1), 0px 4px 2px 0px rgba(0,0,0,0.04), 0px 1px 4px 0px rgba(0,0,0,0.1)',
		height: spacing(8)
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'flex-end',
		position: 'initial',
		height: spacing(8)
	},
	addButton: {
		padding: spacing(0, 14, 0, 4),
		[breakpoints.up('sm')]: {
			padding: spacing(0, 20, 0, 4)
		}
	},
	avatarButton: {
		padding: 0,
		position: 'absolute',
		top: spacing(1.25),
		right: spacing(3),
		[breakpoints.up('sm')]: {
			right: spacing(6)
		}
	},
	avatar: {
		width: spacing(5.5),
		height: spacing(5.5)
	},
	menuButton: {
		position: 'absolute',
		top: 0,
		left: spacing(1.25),
		height: spacing(8),
		'& svg': {
			fill: '#fff',
			height: spacing(4.5),
			width: spacing(4.5)
		}
	}
}));
