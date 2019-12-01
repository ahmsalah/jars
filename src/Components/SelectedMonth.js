import React, { memo, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Tooltip from '@material-ui/core/Tooltip';
import { MonthContext, SetMonthContext } from '../context/month.context';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	root: {
		display: 'flex',
		justifyContent: 'center'
	},
	datePicker: {
		justifySelf: 'flex-start',
		minWidth: spacing(17.5),
		maxWidth: spacing(19),
		'& input': {
			paddingTop: spacing(2),
			paddingBottom: spacing(2),
			cursor: 'pointer',
			textAlign: 'center'
		}
	},
	moreButton: {
		marginLeft: spacing(1)
	},
	morePopover: {
		padding: spacing(1.5, 2.5),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}));

function SelectedMonth() {
	const classes = useStyles();

	const month = useContext(MonthContext);
	const setMonth = useContext(SetMonthContext);

	const nextPreviousMonth = acc => {
		const newDate = month.setMonth(month.getMonth() + acc);
		setMonth(new Date(newDate));
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<div className={classes.root}>
				<Tooltip title="Previous Month" placement="top" arrow>
					<IconButton onClick={() => nextPreviousMonth(-1)}>
						<ArrowLeftIcon />
					</IconButton>
				</Tooltip>

				<DatePicker
					className={classes.datePicker}
					showTodayButton
					variant="dialog"
					inputVariant="outlined"
					openTo="month"
					views={[ 'year', 'month' ]}
					// label="Showing transactions for"
					// helperText="Start from year selection"
					value={month}
					onChange={setMonth}
					autoOk
				/>
				<Tooltip title="Next Month" placement="top" arrow>
					<IconButton onClick={() => nextPreviousMonth(+1)}>
						<ArrowRightIcon />
					</IconButton>
				</Tooltip>
			</div>
		</MuiPickersUtilsProvider>
	);
}

export default memo(SelectedMonth);
