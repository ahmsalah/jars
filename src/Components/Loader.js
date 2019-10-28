import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	progress: {
		margin: theme.spacing(15, 2, 2)
	}
}));

function Loader() {
	const classes = useStyles();

	return (
		<div>
			<CircularProgress className={classes.progress} size={90} thickness={3.6} />
		</div>
	);
}

export default Loader;
