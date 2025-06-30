import styled from 'styled-components';
import { CERISE_COLORS } from '../../styles/colors';

interface SecondaryContentsProps {
  difference: number;
}

interface MainIconProps {
  type: string;
}

export const Container = styled.div`
  cursor: default;
  background: linear-gradient(135deg, #fff 0%, ${CERISE_COLORS.pale} 100%);
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: start;
  border-radius: 20px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: ${CERISE_COLORS.shadows.card};
  border: 1px solid ${CERISE_COLORS.borders.primary};
  padding: 16px;
  
  &:hover {
    box-shadow: ${CERISE_COLORS.shadows.primaryHover};
    transform: translateY(-4px);
    border-color: ${CERISE_COLORS.primary};
  }
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const MainContents = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 700;
  justify-content: space-between;
  gap: 12px;
  font-size: 1rem;

  > span {
    color: ${CERISE_COLORS.text.secondary};
  }
`;

export const SecondaryContents = styled.div<SecondaryContentsProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  > svg {
    fill: ${({ difference }) =>
      difference > 0 ? CERISE_COLORS.success : CERISE_COLORS.error};
  }

  > span:nth-child(even) {
    color: ${({ difference }) =>
      difference > 0 ? CERISE_COLORS.success : CERISE_COLORS.error};
    font-size: 0.8rem;
    font-weight: 600;
  }

  > span:nth-child(odd) {
    white-space: nowrap;
    font-size: 0.8rem;
    color: ${CERISE_COLORS.text.secondary};
  }
`;

export const MainIcon = styled.div<MainIconProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 50%;
  padding: 1rem;
  background: ${({ type }) => getBackgroundGradient(type)};
  box-shadow: ${CERISE_COLORS.shadows.primary};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${CERISE_COLORS.shadows.primaryHover};
  }
  
  > svg {
    width: 1em;
    height: 1em;
    fill: white;
  }
`;

function getBackgroundGradient(type: string): string {
  switch (type) {
    case 'budget':
      return `linear-gradient(135deg, ${CERISE_COLORS.error} 0%, #d32f2f 100%)`;
    case 'customers':
      return `linear-gradient(135deg, ${CERISE_COLORS.success} 0%, ${CERISE_COLORS.successDark} 100%)`;
    case 'task':
      return `linear-gradient(135deg, ${CERISE_COLORS.accent} 0%, ${CERISE_COLORS.accentDark} 100%)`;
    default:
      return `linear-gradient(135deg, ${CERISE_COLORS.primary} 0%, ${CERISE_COLORS.primaryDark} 100%)`;
  }
}
