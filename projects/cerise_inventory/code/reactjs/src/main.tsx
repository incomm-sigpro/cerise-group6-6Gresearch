import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import GlobalStyles from './styles/global';
import { createCeriseTheme } from './styles/theme';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';

import { AuthProvider } from './hooks/AuthProvider';
import { Routes } from './routes/index';

// Componente wrapper para aplicar o tema dinâmico
function AppWithTheme() {
  const { themeMode } = useTheme();
  const muiTheme = createCeriseTheme(themeMode);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <StyledThemeProvider theme={muiTheme}>
        <GlobalStyles />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  </React.StrictMode>
);
