import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
	root: {
		margin: spacing(0, 2.5),
		flex: '1',
		padding: spacing(0, 0, 0.5),
		'& ul': {
			padding: '0',
			backgroundColor: 'var(--color-grey-light-4)'
		}
	},
	title: {
		backgroundColor: 'var(--color-grey-light-2)',
		padding: spacing(2, 4, 1.5),
		fontWeight: '500'
	},
	divider: {
		// width: '80%'
	}
}));
