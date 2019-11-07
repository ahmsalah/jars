import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
	root: {
		padding: spacing(11, 2, 6),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	},
	typography: {
		textAlign: 'center',
		marginBottom: spacing(2),
		[breakpoints.up('sm')]: {
			fontSize: '5rem'
		}
	},
	jarsImg: {
		filter: 'grayscale(70%)',
		width: '100%',
		maxWidth: spacing(70),
		marginTop: spacing(1)
	}
}));

function Reports() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h2" className={classes.typography}>
				Coming soon!
			</Typography>
			<img
				className={classes.jarsImg}
				src={require(`../assets/all-jars.png`)}
				alt="No Transactions"
			/>
		</div>
	);
}

export default Reports;
