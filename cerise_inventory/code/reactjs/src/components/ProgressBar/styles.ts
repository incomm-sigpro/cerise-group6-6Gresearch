import styled from 'styled-components';
import { LinearProgress, LinearProgressProps } from '@mui/material';

export const StyledLinearProgres = styled(LinearProgress)<LinearProgressProps>`
  & .MuiLinearProgress-bar1Determinate {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;
