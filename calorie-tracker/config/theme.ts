import { createTheme } from '@mui/material/styles';
import { red, common } from '@mui/material/colors';
// Create a theme instance.

const theme = createTheme({
  palette: {
    primary: {
      main: '#19857b',
    },
    secondary: {
      main: '#FFF',
    },
    error: {
      main: red.A400,
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});
export default theme; 