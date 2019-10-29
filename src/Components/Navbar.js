import React, { useContext, useState } from 'react';
import NewTransactionForm from './NewTransactionForm';
import NewCategoryForm from './NewCategoryForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../firebase/firebase';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext } from '../context/auth.context';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		backgroundColor: palette.tertiary[2],
		zIndex: 280,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
		padding: spacing(0, 10, 0, 4),
		boxShadow:
			'0px 2px 2px -1px rgba(0,0,0,0.1), 0px 4px 2px 0px rgba(0,0,0,0.04), 0px 1px 4px 0px rgba(0,0,0,0.1)'
	},
	avatarButton: {
		padding: 0,
		margin: spacing(0, 2, 0, 4)
	},
	avatar: {
		width: spacing(5),
		height: spacing(5)
	},
	popover: {
		padding: spacing(2),
		display: 'flex',
		backgroundColor: palette.grey[900]
	},
	popoverContent: {
		padding: spacing(0, 1.5),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	popoverAvatar: {
		margin: spacing(0, 1),
		width: spacing(12),
		height: spacing(12)
	},
	signOutButton: {
		marginTop: spacing(2)
	},
	bolder: {
		fontWeight: 500
	},
	typography: {
		color: '#fff'
	}
}));

function Navbar({ display }) {
	const classes = useStyles();
	const currentUser = useContext(AuthContext);

	const [ anchorEl, setAnchorEl ] = useState(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<AppBar color="inherit" className={classes.root}>
			<Toolbar>
				{display === 'categories' ? <NewCategoryForm /> : <NewTransactionForm />}

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
