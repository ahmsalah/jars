import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
	root: {
		backgroundColor: '#fff',
		cursor: 'grab',
		'&:active': {
			cursor: 'grabbing '
		},
		'&:hover button': {
			opacity: '1'
		}
	},
	deleteButton: {
		opacity: '0',
		transition: 'opacity .3s',
		'&:hover': {
			backgroundColor: 'transparent'
		}
	}
}));
