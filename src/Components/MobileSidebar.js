import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import AssignmentIcon from '@material-ui/icons/Assignment';
import JarIcon from '../assets/svgs/JarIcon';

const useStyles = makeStyles(({ spacing, palette }) => ({
	drawer: {
		backgroundColor: palette.grey[900],
		height: '100%',
		paddingTop: spacing(1)
	},
	listItem: {
		padding: spacing(2, 4.5, 2, 3.5),
		color: 'rgba(255, 255, 255, 0.72)',
		'& svg': {
			fill: 'rgba(255, 255, 255, 0.72)'
		},
		'& hr': {
			backgroundColor: 'rgba(255, 255, 255, 0.08)'
		}
	},
	active: {
		color: 'rgba(255, 255, 255, 1)',
		'& svg': {
			fill: 'rgba(255, 255, 255, 1)'
		}
	}
}));

function MobileSidebar({ drawerOpen, setDrawerOpen }) {
	const classes = useStyles();

	const toggleDrawer = open => event => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawerOpen(open);
	};

	const tabs = [ 'Transactions', 'Categories', 'Budgets', 'Jars', 'Reports' ];
	const generateIcon = val => {
		if (val === 'Transactions') return <HomeIcon />;
		else if (val === 'Categories') return <CategoryIcon />;
		else if (val === 'Budgets') return <AssignmentIcon />;
		else if (val === 'Jars') return <JarIcon />;
		else if (val === 'Reports') return <CollectionsBookmarkIcon />;
	};

	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

	return (
		<SwipeableDrawer
			disableBackdropTransition={!iOS}
			disableDiscovery={iOS}
			open={drawerOpen}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}>
			<div className={classes.drawer}>
				<div
					className={classes.list}
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}>
					<List>
						{tabs.map((item, i) => (
							<React.Fragment key={item}>
								<ListItem
									className={classes.listItem}
									button
									component={NavLink}
									exact
									activeClassName={classes.active}
									onClick={toggleDrawer(false)}
									to={i > 0 ? `/${item.toLowerCase()}` : '/'}>
									<ListItemIcon>{generateIcon(item)}</ListItemIcon>
									<ListItemText primary={item} />
								</ListItem>
								{i < tabs.length - 1 && <Divider />}
							</React.Fragment>
						))}
					</List>
				</div>
			</div>
		</SwipeableDrawer>
	);
}
export default memo(MobileSidebar);
