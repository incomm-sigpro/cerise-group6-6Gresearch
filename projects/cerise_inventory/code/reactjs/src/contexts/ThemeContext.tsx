import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextData {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Recupera o tema salvo no localStorage ou usa 'light' como padrão
    const savedTheme = localStorage.getItem('@CeriseInventory:theme');
    return (savedTheme as ThemeMode) || 'light';
  });

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('@CeriseInventory:theme', newTheme);
  };

  const handleSetThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem('@CeriseInventory:theme', mode);
  };

  // Aplica o tema ao body quando o tema muda
  useEffect(() => {
    document.body.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        toggleTheme,
        setThemeMode: handleSetThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
} 