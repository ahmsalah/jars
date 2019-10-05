import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
	root: {
		zIndex: 280,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
		padding: spacing(0, 15, 0, 4),
		boxShadow:
			'0px 2px 2px -1px rgba(0,0,0,0.1), 0px 4px 2px 0px rgba(0,0,0,0.04), 0px 1px 4px 0px rgba(0,0,0,0.1)'
	}
}));
