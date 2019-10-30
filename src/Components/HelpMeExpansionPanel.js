import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette, typography, breakpoints }) => ({
	root: {
		maxWidth: 416,
		margin: spacing(0, 1.5),
		[breakpoints.up('sm')]: {
			margin: spacing(0, 1.5)
		}
	},
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

function HelpMeExpansionPanel() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<ExpansionPanel className={classes.expansionPanel}>
				<ExpansionPanelSummary
					className={classes.expansionPanelSummary}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header">
					<Typography>Help me!</Typography>
				</ExpansionPanelSummary>

				<ExpansionPanelDetails className={classes.expansionPanelDetails}>
					<Typography className={classes.panelDetailsTypography}>
						To add a new transaction, choose the transaction type and fill in the fields
						below. If the category you want is not listed, you can list a new category
						in the cateogries tab.
					</Typography>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
}

export default HelpMeExpansionPanel;
