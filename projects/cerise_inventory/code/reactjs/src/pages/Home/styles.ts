import { Grid } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Grid)`
  display: flex;
  > h2 {
    padding: 1.5rem 0 0 2rem;
  }
`;

export const Content = styled(Grid)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;

export const CardsContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const ChartsContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 24px;
`;

export const Footer = styled.footer`
  grid-area: footer;
  width: 100%;
  height: 56px;
  background: ${({ theme }) => theme.palette.grey[800]};
  color: ${({ theme }) => theme.palette.grey[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  border-top: 5px solid ${({ theme }) => theme.palette.cerise.main};
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.1);
`;
