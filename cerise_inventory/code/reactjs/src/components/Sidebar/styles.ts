import styled from 'styled-components';
import { CERISE_COLORS } from '../../styles/colors';

interface NavProps {
  $opened?: boolean;
}

interface MainProps {
  $opened?: boolean;
}

export const Container = styled.div`
  display: flex;
`;

export const Nav = styled.nav<NavProps>`
  height: 100%;
  width: ${({ $opened = true }) => ($opened ? '280px' : '64px')};
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  background: ${CERISE_COLORS.gradients.sidebar};
  color: ${CERISE_COLORS.primary};
  grid-area: sidebar;
  transition: width 0.4s;
  border-right: 2px solid ${CERISE_COLORS.borders.primary};
  box-shadow: ${CERISE_COLORS.shadows.card};
`;

export const NavHeader = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, ${CERISE_COLORS.primary} 0%, ${CERISE_COLORS.primaryDark} 100%);
  border-bottom: 2px solid ${CERISE_COLORS.primaryLight};

  > button {
    > svg {
      margin-top: 6px;
      color: #fff;
      transition: all 0.2s ease;
      
      &:hover {
        color: ${CERISE_COLORS.secondary};
        transform: scale(1.1);
      }
    }
  }

  > img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 78%;
    transition: display 0.4s;
    object-fit: -web-kit-responsive;
  }
`;

export const Main = styled.main<MainProps>`
  display: flex;
  margin-top: 64px;
  flex-direction: column;
  margin-left: ${({ $opened }) => ($opened ? '280px' : '64px')};
  transition: margin 0.4s;
  margin-bottom: 1rem;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  padding: 20px 10px 0 10px;
  gap: 5px;
  height: 100%;
`;

export const Footer = styled.div`
  padding-top: 20px;
  height: 200px;
  padding-left: -10px;
  background: linear-gradient(180deg, transparent 0%, ${CERISE_COLORS.pale} 100%);
`;
