import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
	palette: {
		type: "dark",
		primary: {
			main: '#bf2574',
			light: '#df7caf',
			dark: '#7c0c45'
		},
		secondary: green,
	},
	
	typography: {
		h1: {
			fontSize: '3rem'
		}
	}


});

export default theme;
