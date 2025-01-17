import { createTheme } from '@mui/material/styles';
import { COLORS } from './colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: COLORS.primary,
    },
    background: {
      default: COLORS.background,
      paper: COLORS.surface,
    },
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
    },
    error: {
      main: COLORS.error,
    },
    inputBackground: COLORS.inputBackground,
    inputText: COLORS.inputText,
    inputPlaceholder: COLORS.inputPlaceholder,
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
