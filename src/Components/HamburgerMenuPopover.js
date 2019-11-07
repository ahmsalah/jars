import React from 'react';
import { NavLink } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';
import JarIcon from './JarIcon';

const useStyles = makeStyles(({ spacing, palette }) => ({
	popover: {
		padding: spacing(1, 2),
		backgroundColor: palette.grey[900],
		color: 'rgba(255, 255, 255, 0.78)',
		'& svg': {
			fill: 'rgba(255, 255, 255, 0.78)'
		},
		'& hr': {
			backgroundColor: 'rgba(255, 255, 255, 0.12)'
		}
	},
	active: {
		color: 'rgba(255, 255, 255, 1)',
		'& svg': {
			fill: 'rgba(255, 255, 255, 1)'
		}
	}
}));

function HamburgerMenuPopover({ anchorEl, setAnchorEl }) {
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const classes = useStyles();

	const tabs = [ 'Transactions', 'Categories', 'Budget', 'Jars', 'Reports' ];
	const generateIcons = val => {
		if (val === 'Transactions') return <HomeIcon />;
		else if (val === 'Categories') return <CategoryIcon />;
		else if (val === 'Budget') return <AssignmentIcon />;
		else if (val === 'Jars') return <JarIcon />;
		else if (val === 'Reports') return <CollectionsBookmarkIcon />;
	};

	return (
		<Popover
			id={id}
			open={open}
			anchorEl={anchorEl}
			onClose={() => setAnchorEl(null)}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center'
			}}>
			<div className={classes.popover}>
				<List>
					{tabs.map((item, i) => (
						<React.Fragment key={item}>
							<ListItem
								onClick={() => setAnchorEl(null)}
								button
								component={NavLink}
								exact
								activeClassName={classes.active}
								to={i > 0 ? `/${item.toLowerCase()}` : '/'}>
								<ListItemIcon>{generateIcons(item)}</ListItemIcon>
								<ListItemText primary={item} />
							</ListItem>
							{i < tabs.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			</div>
		</Popover>
	);
}

export default HamburgerMenuPopover;
