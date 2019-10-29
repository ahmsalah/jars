import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NewTransactionForm from './NewTransactionForm';
import NewCategoryForm from './NewCategoryForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './styles/navbar.styles';
import firebase from '../firebase/firebase';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext } from '../context/auth.context';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function Navbar() {
	const classes = useStyles();
	const currentUser = useContext(AuthContext);
	const location = useHistory().location.pathname;
	const [ anchorEl, setAnchorEl ] = useState(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<AppBar color="inherit" className={classes.root}>
			<Toolbar>
				{location === '/' && <NewTransactionForm />}
				{location === '/categories' && <NewCategoryForm />}

				<IconButton
					onClick={e => setAnchorEl(e.currentTarget)}
					className={classes.avatarButton}
					aria-label="delete">
					<Avatar
						alt={currentUser.displayName}
						src={currentUser.photoURL}
						className={classes.avatar}
					/>
				</IconButton>

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
						<Avatar
							alt={currentUser.displayName}
							src={currentUser.photoURL}
							className={classes.popoverAvatar}
						/>
						<div className={classes.popoverContent}>
							<Typography variant="body2" className={classes.typography}>
								Signed in as{' '}
								<span className={classes.bolder}>{currentUser.displayName}</span>
							</Typography>
							<Typography variant="caption" className={classes.typography}>
								{currentUser.email}
							</Typography>

							<Button
								variant="contained"
								color="primary"
								size="small"
								className={classes.signOutButton}
								onClick={() => firebase.auth().signOut()}>
								Sign Out
							</Button>
						</div>
					</div>
				</Popover>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
