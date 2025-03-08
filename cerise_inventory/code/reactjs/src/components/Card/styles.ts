import styled from 'styled-components';

interface SecondaryContentsProps {
  difference: number;
}

interface MainIconProps {
  type: string;
}

export const Container = styled.div`
  cursor: default;
  background-color: rgb(255, 255, 255);
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: start;
  border-radius: 20px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 5px 22px,
    rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px;
  padding: 16px;
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
    color: rgb(108, 115, 127);
  }
`;

export const SecondaryContents = styled.div<SecondaryContentsProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  > svg {
    fill: ${({ theme, difference }) =>
      difference > 0 ? theme.palette.primary.light : 'red'};
  }

  > span:nth-child(even) {
    color: ${({ theme, difference }) =>
      difference > 0 ? theme.palette.primary.light : 'red'};
    font-size: 0.8rem;
  }

  > span:nth-child(odd) {
    white-space: nowrap;
    font-size: 0.8rem;
  }
`;

export const MainIcon = styled.div<MainIconProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 50%;
  padding: 1rem;
  background-color: ${({ type }) => getBackgroundColor(type)};
  > svg {
    width: 1em;
    height: 1em;
    fill: white;
  }
`;

function getBackgroundColor(type: string): string {
  switch (type) {
    case 'budget':
      return 'rgb(240, 68, 56)';
    case 'customers':
      return 'rgb(16, 185, 129)';
    case 'task':
      return 'rgb(247, 144, 9)';
    default:
      return 'rgb(99, 102, 241)';
  }
}
