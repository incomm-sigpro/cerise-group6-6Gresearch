export const config = {
  api: {
    baseURL: 'http://localhost:3000', // Ajuste conforme necessário
    timeout: 10000,
  },
  app: {
    name: 'Cerise Inventory',
    version: '1.0.0',
  },
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34c759',
    warning: '#ff9500',
    danger: '#ff4444',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    border: '#dddddd',
  },
  storage: {
    tokenKey: 'token',
    userKey: 'user',
  },
}; 