import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import JarIcon from './JarIcon';

function Sidebar() {
	const classes = useStyles();
	const history = useHistory();
	const matches = useMediaQuery('(min-width:800px)');
	const [ isOpen, setIsOpen ] = useState(matches);
	const [ value, setValue ] = useState(history.location.pathname);

	useEffect(
		() => {
			setIsOpen(matches);
		},
		[ matches ]
	);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		history.push(newValue);
	};

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: isOpen,
				[classes.drawerClose]: !isOpen
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: isOpen,
					[classes.drawerClose]: !isOpen
				})
			}}
			open={isOpen}>
			<div className={classes.toolbar}>
				<IconButton className={classes.chevronButton} onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</div>
			<Divider />

			<Tabs
				indicatorColor="primary"
				orientation="vertical"
				value={value === '/login' ? '/' : value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				className={classes.tabs}>
				<Tab label={isOpen && 'Transactions'} icon={<HomeIcon />} value="/" />
				<Tab label={isOpen && 'Categories'} icon={<CategoryIcon />} value="/categories" />
				<Tab label={isOpen && 'Budget'} icon={<AssignmentIcon />} value="/budget" />
				<Tab label={isOpen && 'Jars'} icon={<JarIcon />} value="/jars" />
				<Tab
					label={isOpen && 'Reports'}
					icon={<CollectionsBookmarkIcon />}
					value="/reports"
				/>
			</Tabs>
		</Drawer>
	);
}
export default Sidebar;
