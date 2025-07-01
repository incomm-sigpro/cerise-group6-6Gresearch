import { ButtonProps } from '@mui/material';
import * as S from './styles';

export function Button(props: ButtonProps) {
  return (
    <S.StyledButton fullWidth size="large" variant="contained" {...props} />
  );
}
