import React from 'react';
import { NavLink } from 'react-router-dom';
import useToggleState from '../hooks/useToggleState';
import useStyles from './SidebarStyles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import AssignmentIcon from '@material-ui/icons/Assignment';

function Sidebar() {
	const classes = useStyles();
	const [ open, toggleOpen ] = useToggleState(false);

	const tabs = [ 'Transactions', 'Categories', 'Budget', 'Reports' ];
	const generateIcons = val => {
		if (val === 'Transactions') return <HomeIcon />;
		else if (val === 'Categories') return <CategoryIcon />;
		else if (val === 'Budget') return <AssignmentIcon />;
		else if (val === 'Reports') return <CollectionsBookmarkIcon />;
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
			<List>
				{tabs.map((text, index) => (
					<ListItem
						key={text}
						button
						component={NavLink}
						exact
						activeClassName={classes.active}
						to={index > 0 ? `/${text.toLowerCase()}` : '/'}>
						<ListItemIcon>{generateIcons(text)}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}
export default Sidebar;
