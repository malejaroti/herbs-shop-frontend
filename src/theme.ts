// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: "#ebffe9",   // color principal
      light: "#80e27e",  // opcional
      dark: "#087f23",   // opcional
      contrastText: "#5d655c", // color del texto sobre primary
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          '& a': {
            color: 'inherit',
            textDecoration: 'none',
          },
          '& a:visited': { color: 'inherit' },
          '& a:hover': { color: 'inherit' },
          '& a:active': { color: 'inherit' },
        },
      },
    },
  }
});

export default theme;