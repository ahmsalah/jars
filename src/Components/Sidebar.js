import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useToggleState from '../hooks/useToggleState';
import useStyles from './styles/sidebar.styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function Sidebar() {
	const classes = useStyles();
	const history = useHistory();
	const [ open, toggleOpen ] = useToggleState(true);
	const [ value, setValue ] = useState('/');

	const handleChange = (event, newValue) => {
		setValue(newValue);
		history.push(newValue);
	};

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})
			}}
			open={open}>
			<div className={classes.toolbar}>
				<IconButton className={classes.chevronButton} onClick={() => toggleOpen()}>
					{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</div>
			<Divider />

			<Tabs
				indicatorColor="primary"
				orientation="vertical"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				className={classes.tabs}>
				<Tab label={open && 'Transactions'} icon={<HomeIcon />} value="/" />
				<Tab label={open && 'Categories'} icon={<CategoryIcon />} value="/categories" />
				<Tab label={open && 'Budget'} icon={<AssignmentIcon />} value="/budget" />
				<Tab
					label={open && 'Reports'}
					icon={<CollectionsBookmarkIcon />}
					value="/reports"
				/>
			</Tabs>
		</Drawer>
	);
}
export default Sidebar;
