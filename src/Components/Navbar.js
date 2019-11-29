import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TransactionForm from './TransactionForm';
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
import BudgetForm from './BudgetForm';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

function Navbar() {
	const classes = useStyles();
	const currentUser = useContext(AuthContext);
	const location = useLocation().pathname;
	const [ anchorProfile, setAnchorProfile ] = useState(null);
	const [ anchorMenu, setAnchorMenu ] = useState(null);
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const matches = useMediaQuery('(min-width:360px)');
	const matchesXS = useMediaQuery('(min-width:310px)');

	return (
		<React.Fragment>
			{location === '/' && (
				<TransactionForm dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
			)}
			{location === '/categories' && (
				<NewCategoryForm dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
			)}
			{location === '/budgets' && (
				<BudgetForm dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
			)}

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
						<Button
							size={matches ? 'medium' : 'small'}
							variant="contained"
							color="primary"
							onClick={() => setDialogOpen(true)}>
							{!matchesXS ? (
								<AddIcon />
							) : (
								(location === '/' && 'Add Transaction') ||
								(location === '/categories' && 'Create Category') ||
								(location === '/budgets' && 'Create Budget')
							)}
						</Button>
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
		</React.Fragment>
	);
}

export default Navbar;
