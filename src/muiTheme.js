import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		background: { default: 'rgb(232, 232, 232)' },
		primary: { main: '#1aa333', sub: 'rgb(167, 220, 177)' },
		secondary: { main: '#de474e', sub: 'rgb(242, 185, 187)' },
		tertiary: {
			main: '#334960',
			sub: '#68788d',
			1: 'rgb(60, 65, 78)',
			2: 'rgb(56, 60, 74)',
			3: 'rgb(47, 52, 63)'
		},
		grey: {
			light: {
				0: 'rgb(250,250,250)',
				1: 'rgb(245,245,245)',
				2: 'rgb(242,242,242)',
				3: 'rgb(240, 240, 240)',
				4: 'rgb(238, 238, 238)',
				5: 'rgb(232, 232, 232)'
			},
			dark: {
				1: '#333',
				2: '#777',
				3: '#999'
			}
		}
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			cmp: 800,
			md: 960,
			lg: 1280,
			xl: 1920
		}
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				body: {
					backgroundColor: 'rgb(232, 232, 232)'
				}
			}
		}
	},
	shape: {
		borderRadius: 6
	}
});

export default theme;
