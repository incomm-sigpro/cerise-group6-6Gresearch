import { Button, Grid, Container as MuiContainer } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(MuiContainer).attrs({
  maxWidth: 'xl',
})`
  display: flex;

  margin-top: 5rem;
  > h2 {
      padding: 1.5rem 0 0 2rem;
  }
`;

export const Content = styled.div`
    grid-area: content;
    padding: 0 64px;
    overflow: auto;

    display: flex;
    flex-direction: column;
    gap: 48px;

    background-color: ${({ theme }) => theme.palette.grey[200]};

    width: calc(100vw - 280px);
    height: 100vh;

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
  margin-right: 0.5rem;
`;
