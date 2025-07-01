import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import * as S from './styles';

export function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <S.Container>
      <Tooltip title={`Alternar para tema ${themeMode === 'light' ? 'escuro' : 'claro'}`}>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(180deg)',
            },
          }}
        >
          {themeMode === 'light' ? (
            <Brightness4 sx={{ color: '#c60463' }} />
          ) : (
            <Brightness7 sx={{ color: '#e6398a' }} />
          )}
        </IconButton>
      </Tooltip>
    </S.Container>
  );
} 