// Paleta de cores CERISE - Baseada na cor principal #c60463
// Suporte para tema claro e escuro

export const CERISE_COLORS = {
  // Cor principal
  primary: '#c60463',
  primaryLight: '#e6398a',
  primaryDark: '#8a0438',
  
  // Cor secundária (verde-azulado complementar)
  secondary: '#04c6a3',
  secondaryLight: '#39e6c6',
  secondaryDark: '#038a6f',
  
  // Cor de destaque (laranja)
  accent: '#c66a04',
  accentLight: '#e68a39',
  accentDark: '#8a4a03',
  
  // Azul baseado na paleta CERISE
  info: '#04a3c6',
  infoLight: '#39c6e6',
  infoDark: '#036f8a',
  
  // Verde baseado na paleta CERISE
  success: '#04c663',
  successLight: '#39e68a',
  successDark: '#038a4a',
  
  // Vermelho para erros
  error: '#d32f2f',
  errorLight: '#ef5350',
  errorDark: '#c62828',
  
  // Rosa muito claro para backgrounds
  pale: '#fce4ec',
  
  // Rosa mais suave
  muted: '#e91e63',
  
  // Tons de cinza personalizados
  grey: {
    50: '#fefefe',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#2f3746',
    800: '#5E6B76',
    900: '#312E38',
  },
  
  // Cores de texto
  text: {
    primary: '#2f3746',
    secondary: '#757575',
    disabled: '#757575',
  },
  
  // Cores de fundo
  background: {
    default: '#fafafa',
    paper: '#fff',
  },
  
  // Gradientes
  gradients: {
    primary: 'linear-gradient(45deg, #c60463 30%, #e6398a 90%)',
    secondary: 'linear-gradient(45deg, #04c6a3 30%, #39e6c6 90%)',
    accent: 'linear-gradient(45deg, #c66a04 30%, #e68a39 90%)',
    background: 'linear-gradient(135deg, #fce4ec 0%, #fafafa 100%)',
    header: 'linear-gradient(90deg, #c60463 0%, #8a0438 100%)',
    sidebar: 'linear-gradient(180deg, #fce4ec 0%, #fff 100%)',
  },
  
  // Sombras
  shadows: {
    primary: '0 2px 4px rgba(198, 4, 99, 0.2)',
    primaryHover: '0 4px 8px rgba(198, 4, 99, 0.3)',
    card: '0 4px 12px rgba(198, 4, 99, 0.1)',
    header: '0 2px 8px rgba(198, 4, 99, 0.3)',
  },
  
  // Bordas
  borders: {
    primary: 'rgba(198, 4, 99, 0.1)',
    input: 'rgba(198, 4, 99, 0.2)',
    focus: 'rgba(198, 4, 99, 0.1)',
  },
} as const;

// Paleta para tema escuro
export const CERISE_DARK_COLORS = {
  // Cor principal (mantém a mesma)
  primary: '#c60463',
  primaryLight: '#e6398a',
  primaryDark: '#8a0438',
  
  // Cor secundária (mantém a mesma)
  secondary: '#04c6a3',
  secondaryLight: '#39e6c6',
  secondaryDark: '#038a6f',
  
  // Cor de destaque (mantém a mesma)
  accent: '#c66a04',
  accentLight: '#e68a39',
  accentDark: '#8a4a03',
  
  // Azul baseado na paleta CERISE
  info: '#04a3c6',
  infoLight: '#39c6e6',
  infoDark: '#036f8a',
  
  // Verde baseado na paleta CERISE
  success: '#04c663',
  successLight: '#39e68a',
  successDark: '#038a4a',
  
  // Vermelho para erros
  error: '#f44336',
  errorLight: '#ef5350',
  errorDark: '#d32f2f',
  
  // Rosa escuro para backgrounds
  pale: '#1a0f1a',
  
  // Rosa mais suave
  muted: '#e91e63',
  
  // Tons de cinza para tema escuro
  grey: {
    50: '#1a1a1a',
    100: '#2d2d2d',
    200: '#404040',
    300: '#525252',
    400: '#666666',
    500: '#808080',
    600: '#999999',
    700: '#b3b3b3',
    800: '#cccccc',
    900: '#e6e6e6',
  },
  
  // Cores de texto para tema escuro
  text: {
    primary: '#ffffff',
    secondary: '#b3b3b3',
    disabled: '#666666',
  },
  
  // Cores de fundo para tema escuro
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  
  // Gradientes para tema escuro
  gradients: {
    primary: 'linear-gradient(45deg, #c60463 30%, #e6398a 90%)',
    secondary: 'linear-gradient(45deg, #04c6a3 30%, #39e6c6 90%)',
    accent: 'linear-gradient(45deg, #c66a04 30%, #e68a39 90%)',
    background: 'linear-gradient(135deg, #1a0f1a 0%, #121212 100%)',
    header: 'linear-gradient(90deg, #8a0438 0%, #1a0f1a 100%)',
    sidebar: 'linear-gradient(180deg, #1a0f1a 0%, #1e1e1e 100%)',
  },
  
  // Sombras para tema escuro
  shadows: {
    primary: '0 2px 4px rgba(198, 4, 99, 0.3)',
    primaryHover: '0 4px 8px rgba(198, 4, 99, 0.4)',
    card: '0 4px 12px rgba(0, 0, 0, 0.5)',
    header: '0 2px 8px rgba(0, 0, 0, 0.6)',
  },
  
  // Bordas para tema escuro
  borders: {
    primary: 'rgba(198, 4, 99, 0.2)',
    input: 'rgba(198, 4, 99, 0.3)',
    focus: 'rgba(198, 4, 99, 0.2)',
  },
} as const;

// Função para obter cores baseada no tema
export function getThemeColors(themeMode: 'light' | 'dark') {
  return themeMode === 'dark' ? CERISE_DARK_COLORS : CERISE_COLORS;
}

export default CERISE_COLORS; 