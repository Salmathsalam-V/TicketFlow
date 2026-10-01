import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#FACC15',
      contrastText: '#121212',
    },

    secondary: {
      main: '#27272A',
      contrastText: '#FFFFFF',
    },

    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#121212',
      secondary: '#64748B',
    },
  },

  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
          color: '#FFFFFF',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;