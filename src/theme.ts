// src/theme.ts
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    cardDescription: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    gray: Palette['primary'];
  }
  interface PaletteOptions {
    gray?: PaletteOptions['primary'];
  }
}

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
    // primary: {
    //   main: "#ebffe9",   // color principal
    //   light: "#80e27e",  // opcional
    //   dark: "#087f23",   // opcional
    //   contrastText: "#5d655c", // color del texto sobre primary
    // },
    gray: {
      main: '#3c3b3b',  
    }
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
    MuiTypography: {
      variants: [
        {
          props: { variant: 'cardDescription' },
          style: {
            // fontSize: 'clamp(0.9rem, 0.8rem + 0.4vw, 1.05rem)',
            fontSize: '0.7rem',
            // lineHeight: '2px',
          },
        },
      ],
    },
  }
});

export default theme;