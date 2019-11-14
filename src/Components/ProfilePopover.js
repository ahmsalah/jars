import React, { useContext } from 'react';
import firebase from '../firebase/firebase';
import Avatar from '@material-ui/core/Avatar';
import { AuthContext } from '../context/auth.context';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
	popover: {
		padding: spacing(2),
		display: 'flex',
		backgroundColor: palette.grey[900],
		[breakpoints.down('xs')]: {
		padding: spacing(2, 1)
		}
	},
	popoverContent: {
		padding: spacing(0, 1.5),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		[breakpoints.down('xs')]: {
			padding: spacing(0, 1)
		}
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
	name: {
		color: '#fff',
		[breakpoints.down('xs')]: {
			fontSize: '0.825rem'
		}
	},
	email: {
		color: '#fff',
		[breakpoints.down('xs')]: {
			fontSize: '0.70rem'
		}
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
					<Typography variant="body2" className={classes.name}>
						Signed in as{' '}
						<span className={classes.bolder}>{currentUser.displayName}</span>
					</Typography>
					<Typography variant="caption" className={classes.email}>
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
