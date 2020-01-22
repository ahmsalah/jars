import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		padding: spacing(8, 2, 3),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	},
	typography: {
		textAlign: 'center'
	},
	jarsImg: {
		filter: 'grayscale(70%)',
		width: '100%',
		maxWidth: spacing(60),
		margin: spacing(2, 0, 3)
	}
}));

function NothingHere() {
	const classes = useStyles();
	const history = useHistory();

	return (
		<div className={classes.root}>
			<Typography variant="h2" className={classes.typography}>
				There is nothing here!
			</Typography>
			<img
				className={classes.jarsImg}
				src={require(`../assets/all-jars.png`)}
				alt="No Transactions"
			/>
			<Button
				onClick={() => history.push('/')}
				color="primary"
				variant="contained"
				size="large">
				Go back
			</Button>
		</div>
	);
}

export default memo(NothingHere);
