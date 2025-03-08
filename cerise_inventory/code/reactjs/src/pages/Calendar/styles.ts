import { Grid } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Grid)`
  display: flex;
  > div div h2 {
    margin-bottom: 1.5rem;
  }
`;

export const Content = styled(Grid)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;
