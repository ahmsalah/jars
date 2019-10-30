import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NewTransactionForm from './NewTransactionForm';
import NewCategoryForm from './NewCategoryForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './styles/navbar.styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext } from '../context/auth.context';
import HamburgerMenuPopover from './HamburgerMenuPopover';
import ProfilePopover from './ProfilePopover';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';

function Navbar() {
	const classes = useStyles();
	const currentUser = useContext(AuthContext);
	const location = useHistory().location.pathname;
	const [ anchorProfile, setAnchorProfile ] = useState(null);
	const [ anchorMenu, setAnchorMenu ] = useState(null);

	return (
		<AppBar position="sticky" className={classes.root}>
			<Toolbar className={classes.toolbar}>
				<Hidden smUp>
					<IconButton
						onClick={e => setAnchorMenu(e.currentTarget)}
						className={classes.menuButton}
						aria-label="menu">
						<MenuIcon />
					</IconButton>
				</Hidden>
				<div className={classes.addButton}>
					{location === '/' && <NewTransactionForm />}
					{location === '/categories' && <NewCategoryForm />}
				</div>

				<IconButton
					onClick={e => setAnchorProfile(e.currentTarget)}
					className={classes.avatarButton}
					aria-label="sign out">
					<Avatar
						alt={currentUser.displayName}
						src={currentUser.photoURL}
						className={classes.avatar}
					/>
				</IconButton>

				<HamburgerMenuPopover anchorEl={anchorMenu} setAnchorEl={setAnchorMenu} />
				<ProfilePopover anchorEl={anchorProfile} setAnchorEl={setAnchorProfile} />
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
