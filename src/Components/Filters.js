import React from 'react';
import { Toolbar } from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
// import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		padding: spacing(1, 6),
		justifyContent: 'flex-end'
	},
	formControl: {
		margin: spacing(1, 2, 0.5),
		minWidth: 120
	},
	input: {
		'& div': {
			paddingTop: spacing(1.3),
			paddingBottom: spacing(1.3)
		}
	},
	reverseButton: {
		// backgroundColor: 'transparent',
		// '& svg': {
		// width: '1.5em',
		// height: '1.5em'
		// },
		'& button': {
			borderColor: 'rgba(0,0,0,.25)',
			width: spacing(6),
			height: spacing(5),
			marginTop: '3.5px'
		}
	}
}));

function Filters({ isReversed, toggleListReverse, handleChange, orderBy }) {
	const classes = useStyles();
	const inputLabel = React.useRef(null);
	const [ labelWidth, setLabelWidth ] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const reversed = isReversed ? 'reversed' : '';

	return (
		<React.Fragment>
			<Toolbar className={classes.root}>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel ref={inputLabel} htmlFor="orderBy">
						Sorting by
					</InputLabel>
					<Select
						value={orderBy}
						className={classes.input}
						labelWidth={labelWidth}
						onChange={handleChange}
						id="orderBy">
						<MenuItem value="date">Date</MenuItem>
						<MenuItem value="amount">Amount</MenuItem>
						<MenuItem value="category">Category</MenuItem>
					</Select>
				</FormControl>
				{/* <Avatar className={classes.reverseButton}>
					<IconButton onClick={toggleListReverse}>
					</IconButton>
				</Avatar> */}

				<ToggleButtonGroup
					className={classes.reverseButton}
					value={reversed}
					onChange={toggleListReverse}
					arial-label="text formatting">
					<ToggleButton value="reversed" aria-label="bold">
						<SwapVertIcon />
					</ToggleButton>
				</ToggleButtonGroup>
			</Toolbar>
			<Divider />
		</React.Fragment>
	);
}

export default Filters;
