import { InputAdornment, TextFieldProps } from '@mui/material';
import * as React from 'react';

import * as S from './styles';

type CustomInputProps = {
  icon?: React.ReactElement;
} & TextFieldProps

export function Input({ icon, ...props }: CustomInputProps) {
  return (
    <S.StyledTextField
      InputProps = {
        {
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
        }
      }
      variant="filled"
      fullWidth
      {...props}
    />
  );
}