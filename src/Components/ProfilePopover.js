import React, { useContext } from 'react';
import firebase from '../firebase/firebase';
import Avatar from '@material-ui/core/Avatar';
import { AuthContext } from '../context/auth.context';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette }) => ({
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

function ProfilePopover({ anchorEl, setAnchorEl }) {
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const classes = useStyles();
	const currentUser = useContext(AuthContext);

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
	);
}

export default ProfilePopover;
