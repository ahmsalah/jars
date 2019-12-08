import React, { memo, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TransactionForm from './TransactionForm';
import NewCategoryForm from './NewCategoryForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './styles/navbar.styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext } from '../context/auth.context';
import ProfilePopover from './ProfilePopover';
import MenuIcon from '@material-ui/icons/Menu';
import BudgetForm from './BudgetForm';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MobileSidebar from './MobileSidebar';
import Tip from './Tip';

function Navbar() {
	const classes = useStyles();
	const currentUser = useContext(AuthContext);
	const location = useLocation().pathname;
	const [ anchorProfile, setAnchorProfile ] = useState(null);
	const [ drawerOpen, setDrawerOpen ] = useState(false);
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const [ tipOpen, setTipOpen ] = useState(location === '/' && !currentUser.isNewUser);
	const up600 = useMediaQuery('(min-width:600px)');
	const up360 = useMediaQuery('(min-width:360px)');
	const up310 = useMediaQuery('(min-width:310px)');

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
			<ProfilePopover anchorEl={anchorProfile} setAnchorEl={setAnchorProfile} />
			<MobileSidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
			<AppBar position="sticky" className={classes.root}>
				<Toolbar className={classes.toolbar}>
					{!up600 && (
						<IconButton
							onClick={() => setDrawerOpen(true)}
							className={classes.menuButton}
							aria-label="menu">
							<MenuIcon />
						</IconButton>
					)}
					{location !== '/jars' &&
					location !== '/reports' && (
						<div className={classes.addButtonContainer}>
							<Tip
								title="Tap here to add a new transaction"
								open={tipOpen}
								handleClose={() => setTipOpen(false)}
								enableClickAway>
								<Button
									size={up360 ? 'medium' : 'small'}
									variant="contained"
									color="primary"
									onClick={() => {
										setTipOpen(false);
										setDialogOpen(true);
									}}>
									{!up310 ? (
										<AddIcon />
									) : (
										(location === '/' && 'Add Transaction') ||
										(location === '/categories' && 'Create Category') ||
										(location === '/budgets' && 'Create Budget')
									)}
								</Button>
							</Tip>
						</div>
					)}
					<Tooltip title="Sign out" arrow>
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
					</Tooltip>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default memo(Navbar);
