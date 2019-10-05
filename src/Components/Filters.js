import React from 'react';
import { Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(1, 6),
		justifyContent: 'flex-end'
	},
	input: {
		'& div': {
			minWidth: '70px',
			paddingTop: theme.spacing(1.3),
			paddingBottom: theme.spacing(1.3)
		}
	},
	reverseButton: {
		marginLeft: theme.spacing(2),
		backgroundColor: 'transparent',
		'& svg': {
			width: '1.5em',
			height: '1.5em'
		}
	}
}));

function Filters({ toggleListReverse, handleChange, orderBy }) {
	const classes = useStyles();
	const inputLabel = React.useRef(null);
	const [ labelWidth, setLabelWidth ] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	return (
		<React.Fragment>
			<Toolbar className={classes.root}>
				<FormControl variant="outlined">
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

				<Avatar className={classes.reverseButton}>
					<IconButton onClick={toggleListReverse}>
						<SwapVertIcon />
					</IconButton>
				</Avatar>
			</Toolbar>
			<Divider />
		</React.Fragment>
	);
}

export default Filters;
