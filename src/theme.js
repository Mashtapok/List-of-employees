import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: 'rgb(244, 67, 54)',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f9f9f9',
    },
  },
});

export default theme;
