import { Button, Grid } from '@mui/material';
import styled from 'styled-components';

export const ContainerHeader = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AddButton = styled(Button)`
  text-transform: none !important;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 0.5rem;
`;
