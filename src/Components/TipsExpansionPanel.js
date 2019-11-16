import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
	expansionPanel: {
		border: '1px solid rgba(0, 0, 0, .125)',
		boxShadow: 'none',
		'&:before': {
			display: 'none'
		}
	},
	expansionPanelSummary: {
		backgroundColor: 'rgba(0, 0, 0, .03)',
		borderBottom: '1px solid rgba(0, 0, 0, .125)',
		height: 50,
		minHeight: '48px !important'
	},
	expansionPanelDetails: {
		padding: spacing(1.5, 3, 1.75)
	},
	panelDetailsTypography: {
		fontSize: typography.pxToRem(15),
		color: palette.text.secondary
	}
}));

function TipsExpansionPanel({ title, message }) {
	const classes = useStyles();

	return (
		<ExpansionPanel className={classes.expansionPanel}>
			<ExpansionPanelSummary
				className={classes.expansionPanelSummary}
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel2a-content"
				id="panel2a-header">
				<Typography>{title}</Typography>
			</ExpansionPanelSummary>

			<ExpansionPanelDetails className={classes.expansionPanelDetails}>
				<Typography className={classes.panelDetailsTypography}>{message}</Typography>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}

export default TipsExpansionPanel;
