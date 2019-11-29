import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
	root: {
		marginBottom: spacing(5),
		overflow: 'hidden',
		[breakpoints.up('sm')]: {
			display: 'flex'
		}
	},
	report: {
		flexBasis: '25%',
		padding: spacing(4, 2, 2),
		backgroundColor: palette.grey.light[1],
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'& h3': {
			fontSize: '2.9rem',
			marginBottom: spacing(0.5)
		}
	},
	list: {
		padding: spacing(2, 0),
		justifySelf: 'flex-end',
		flexBasis: '75%',
		'& > li:first-child': {
			paddingBottom: 0
		},
		'& > li:nth-child(2)': {
			paddingTop: 0
		},
		'& > li': {
			paddingLeft: 0,
			paddingRight: 0,
			[breakpoints.up('sm')]: {
				paddingLeft: spacing(2),
				paddingRight: spacing(2)
			}
		}
	},
	title: {
		width: '23%',
		flex: 'none',
		marginLeft: spacing(2),
		'& span': {
			fontWeight: 500,
			fontSize: '.95rem',
			[breakpoints.up('md')]: {
				fontSize: '1rem'
			}
		}
	},
	amountTitle: {
		width: 'initial'
	},
	barContainer: {
		flex: '1 1 auto',
		marginRight: 'auto'
	},
	bar: {
		height: 12,
		borderRadius: 4,
		transition: 'width .8s linear',
		transformOrigin: 'left',
		[breakpoints.up('md')]: {
			height: 15
		}
	},
	incBar: {
		backgroundColor: palette.tertiary.main
	},
	expBar: {
		backgroundColor: palette.tertiary.sub
	},
	amount: {
		flex: 'none',
		display: 'flex',
		marginRight: spacing(2),
		marginLeft: spacing(2),
		'& span': {
			fontSize: '.95rem',
			[breakpoints.up('md')]: {
				fontSize: '1.25rem'
			}
		}
	},
	amountTotal: {
		marginTop: 0,
		marginLeft: 'auto',
		'& span': {
			fontSize: '1rem',
			[breakpoints.up('md')]: {
				fontSize: '1.25rem'
			}
		}
	}
}));
