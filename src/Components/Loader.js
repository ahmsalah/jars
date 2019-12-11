import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	progress: {
		margin: theme.spacing(13, 2, 12)
	},
	center: {
		textAlign: 'center'
	}
}));

function Loader() {
	const classes = useStyles();

	return (
		<div className={classes.center}>
			<CircularProgress className={classes.progress} size={90} thickness={3.6} />
		</div>
	);
}

export default memo(Loader);
