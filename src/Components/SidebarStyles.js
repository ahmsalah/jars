import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 210;
export default makeStyles(theme => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		'& > div': {
			border: 'none',
			boxShadow:
				'0px 2px 2px -1px rgba(0,0,0,0.1), 0px 4px 2px 0px rgba(0,0,0,0.04), 0px 1px 4px 0px rgba(0,0,0,0.1)'
		}
	},
	drawerOpen: {
		zIndex: 300,
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(7) + 1
		}
	},
	chevronButton: {
		'& svg': {
			fill: '#fff'
		}
	},
	toolbar: {
		backgroundColor: theme.palette.tertiary[2],
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 0.5),
		...theme.mixins.toolbar
	},
	active: {
		backgroundColor: 'rgba(0, 0, 0, 0.08)'
	}
}));
