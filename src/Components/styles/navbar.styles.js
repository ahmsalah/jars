import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
	root: {
		backgroundColor: palette.tertiary[2],
		zIndex: 280,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
		padding: spacing(0, 10, 0, 4),
		boxShadow:
			'0px 2px 2px -1px rgba(0,0,0,0.1), 0px 4px 2px 0px rgba(0,0,0,0.04), 0px 1px 4px 0px rgba(0,0,0,0.1)'
	},
	avatarButton: {
		padding: 0,
		margin: spacing(0, 2, 0, 4)
	},
	avatar: {
		width: spacing(5),
		height: spacing(5)
	},
	popover: {
		padding: spacing(2),
		display: 'flex',
		backgroundColor: palette.grey[900]
	},
	popoverContent: {
		padding: spacing(0, 1.5),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	popoverAvatar: {
		margin: spacing(0, 1),
		width: spacing(12),
		height: spacing(12)
	},
	signOutButton: {
		marginTop: spacing(2)
	},
	bolder: {
		fontWeight: 500
	},
	typography: {
		color: '#fff'
	}
}));
