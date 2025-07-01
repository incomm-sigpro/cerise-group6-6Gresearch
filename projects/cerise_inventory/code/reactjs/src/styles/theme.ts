import { createTheme, ThemeOptions } from '@mui/material/styles';
import { getThemeColors } from './colors';

// Documentação: https://mui.com/material-ui/customization/default-theme/
// Caso precise de uma cor ou propriedade basta sobrescrever colocando aqui

// Paleta CERISE - Baseada na cor principal #c60463
// Cor principal: #c60463 (Rosa/Magenta vibrante)
// Cores complementares e harmoniosas geradas para criar uma paleta coesa

// Função para criar tema baseado no modo
export function createCeriseTheme(mode: 'light' | 'dark') {
  const colors = getThemeColors(mode);
  
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff',
      },
      // Cor principal CERISE
      primary: {
        main: colors.primary,
        light: colors.primaryLight,
        dark: colors.primaryDark,
        contrastText: '#fff',
      },
      // Cor secundária complementar (verde-azulado)
      secondary: {
        main: colors.secondary,
        light: colors.secondaryLight,
        dark: colors.secondaryDark,
        contrastText: '#fff',
      },
      error: {
        main: colors.error,
        light: colors.errorLight,
        dark: colors.errorDark,
        contrastText: '#fff',
      },
      warning: {
        main: colors.accent,
        light: colors.accentLight,
        dark: colors.accentDark,
        contrastText: '#fff',
      },
      info: {
        main: colors.info,
        light: colors.infoLight,
        dark: colors.infoDark,
        contrastText: '#fff',
      },
      success: {
        main: colors.success,
        light: colors.successLight,
        dark: colors.successDark,
        contrastText: '#fff',
      },
      // Tons de cinza personalizados para CERISE
      grey: colors.grey,
      background: {
        paper: colors.background.paper,
        default: colors.background.default,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        disabled: colors.text.disabled,
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
      fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        color: colors.primary,
        fontWeight: 700,
      },
      h2: {
        color: colors.primary,
        fontWeight: 600,
      },
      h3: {
        color: colors.primaryDark,
        fontWeight: 600,
      },
      h4: {
        color: colors.primaryDark,
        fontWeight: 500,
      },
      h5: {
        color: colors.primaryDark,
        fontWeight: 500,
      },
      h6: {
        color: colors.primaryDark,
        fontWeight: 500,
      },
    },
    // Componentes customizados
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
            textTransform: 'none',
            boxShadow: colors.shadows.primary,
            '&:hover': {
              boxShadow: colors.shadows.primaryHover,
            },
          },
          containedPrimary: {
            background: colors.gradients.primary,
            '&:hover': {
              background: `linear-gradient(45deg, ${colors.primaryDark} 30%, ${colors.primary} 90%)`,
            },
          },
          containedSecondary: {
            background: colors.gradients.secondary,
            '&:hover': {
              background: `linear-gradient(45deg, ${colors.secondaryDark} 30%, ${colors.secondary} 90%)`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: colors.shadows.card,
            border: `1px solid ${colors.borders.primary}`,
            background: mode === 'dark' 
              ? `linear-gradient(135deg, ${colors.background.paper} 0%, ${colors.pale} 100%)`
              : `linear-gradient(135deg, #fff 0%, ${colors.pale} 100%)`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: colors.gradients.header,
            boxShadow: colors.shadows.header,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: colors.gradients.sidebar,
            borderRight: `2px solid ${colors.borders.primary}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: colors.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.primary,
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
}

// Tema padrão (claro)
const theme = createCeriseTheme('light');

export default theme;
