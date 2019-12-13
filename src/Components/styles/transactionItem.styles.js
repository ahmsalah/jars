import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, breakpoints }) => ({
	root: {
		'&:hover button': {
			opacity: '1'
		},
		backgroundColor: '#fff'
	},
	iconContainer: {
		width: '10%',
		[breakpoints.up('sm')]: {
			marginRight: spacing(1)
		}
	},
	icon: {
		width: 48,
		height: 48,
		[breakpoints.up('sm')]: {
			width: 55,
			height: 55
		}
	},
	title: {
		width: '39%'
	},
	date: {
		width: '17%',
		'& span': {
			fontWeight: 500,
			color: 'rgba(0,0,0,.5)'
		}
	},
	amount: {
		[breakpoints.up('sm')]: {
			width: '32%'
		},
		display: 'flex',
		flexDirection: 'Column',
		'& span, p': {
			marginLeft: 'auto',
			fontWeight: 500,
			[breakpoints.up('sm')]: {
				marginRight: spacing(2.5)
			}
		}
	},
	moreButton: {
		padding: spacing(1),
		marginRight: -8,
		[breakpoints.up('sm')]: {
			padding: spacing(1.5),
			marginRight: -5
		},
		[breakpoints.up('md')]: {
			opacity: '0',
			transition: 'opacity .3s'
		}
	},
	popoverButtonsContainer: {
		padding: spacing(0.5, 0)
	},
	popoverButton: {
		padding: spacing(0, 0.5),
		'& > *': {
			padding: spacing(1)
		}
	}
}));
