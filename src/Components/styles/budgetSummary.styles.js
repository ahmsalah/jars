import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
	root: {
		overflow: 'hidden'
	},
	progressBar: {
		height: spacing(1),
		'& > div': {
			transition: 'transform .8s linear'
		}
	},
	list: {
		padding: spacing(0, 0, 0),
		justifySelf: 'flex-end',
		flex: '1'
	},
	monthContainer: {
		padding: spacing(1),
		display: 'flex'
	},
	moreButton: {
		padding: spacing(1),
		[breakpoints.up('sm')]: {
			marginLeft: spacing(-7.5)
		}
	},
	titleContainer: {
		padding: spacing(2, 3, 0)
	},
	incContainer: {
		padding: spacing(1, 3, 0.25)
	},
	expContainer: {
		padding: spacing(0.25, 3, 0),
		[breakpoints.up('sm')]: {
			padding: spacing(0.25, 3, 1)
		}
	},
	totalContainer: {
		padding: spacing(1, 3)
	},
	alignRight: {
		textAlign: 'right'
	},
	marginRightAuto: {
		marginRight: 'auto'
	},
	width: {
		[breakpoints.up('sm')]: {
			width: '24%'
		}
	},
	flexGrow: {
		flex: 1
	},
	title: {
		fontSize: '1.1rem'
	},
	listItemText: {
		flex: 'none',
		'& > span': {
			fontSize: '0.875rem',
			fontWeight: 400,
			lineHeight: 1.43,
			letterSpacing: '0.01071em'
		},
		'& > p': {
			fontSize: '1rem',
			fontWeight: 500,
			lineHeight: 1.5,
			letterSpacing: '0.00938em',
			color: 'rgba(0, 0, 0, 0.87)'
		}
	},
	totalItemText: {
		'& > span': {
			[breakpoints.up('sm')]: {
				fontSize: '0.95rem',
				letterSpacing: '0.02em'
			}
		},
		'& > p': {
			[breakpoints.up('sm')]: {
				fontSize: '1.1rem',
				letterSpacing: '0.02em'
			}
		}
	},
	plannedIncomeWrapper: {
		display: 'flex',
		justifyItems: 'center',
		'& svg': {
			width: '.9em',
			height: '.9em',
			fill: palette.text.primary
		},
		'& button': {
			padding: 3,
			marginTop: -3,
			marginLeft: 1
		}
	},
	incMobOnlyBar: {
		padding: spacing(0, 2, 1.5)
	},
	expMobOnlyBar: {
		padding: spacing(0, 2, 3)
	},
	barContainer: {
		flex: '1 1 auto',
		margin: spacing(0, 1),
		border: '1px solid',
		borderRadius: 10,
		overflow: 'hidden'
	},
	incBarContainer: {
		borderColor: palette.tertiary.main
	},
	expBarContainer: {
		borderColor: palette.tertiary.sub
	},
	bar: {
		height: 12,
		[breakpoints.up('sm')]: {
			height: 15
		},
		transition: 'width .8s linear',
		transformOrigin: 'left',
		'& > div': {
			transition: 'transform .8s linear'
		}
	},
	incBar: {
		backgroundColor: 'rgba(51,73,96, 0.6)',
		'& > div': {
			backgroundColor: palette.tertiary.main
		}
	},
	expBar: {
		backgroundColor: 'rgba(104,120,141,0.6)',
		'& > div': {
			backgroundColor: palette.tertiary.sub
		}
	},
	setupBudgetsButton: {
		margin: spacing(3),
		display: 'flex',
		justifyContent: 'center'
	},
	morePopover: {
		padding: spacing(2, 3)
	}
}));
