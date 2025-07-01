import { Button, Grid, Container as MuiContainer } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(MuiContainer).attrs({
  maxWidth: 'xl',
})`
  margin-top: 4rem;

  overflow: hidden;
`;

/*
Opções para maxWidth
xs: Máxima largura para telas pequenas (menos de 600px).
sm: Máxima largura para telas pequenas e médias (600px a 960px).
md: Máxima largura para telas médias (960px a 1280px).
lg: Máxima largura para telas grandes (1280px a 1920px).
xl: Máxima largura para telas extra grandes (mais de 1920px).
false: Sem limite de largura máxima, o contêiner se expandirá para preencher a largura da janela ou do elemento pai.
*/

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
