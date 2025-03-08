import { Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Grid)`
  margin: 1rem 2rem;

  > h2 {
    padding: 1.5rem 0 0 2rem;
  }
`;

export const Search = styled(Box)`
  display: flex;
  align-items: center;
  padding: 0.5rem 0 1rem 0;
`;

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
  margin-right: 1rem;
`;
