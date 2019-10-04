import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
	root: {
		flex: '1'
	},
	content: {
		margin: `${spacing(15)}px auto ${spacing(5)}px`,
		maxWidth: spacing(88),
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'flex-start'
	}
}));
