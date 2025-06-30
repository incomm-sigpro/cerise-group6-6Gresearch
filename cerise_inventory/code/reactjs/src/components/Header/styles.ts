import styled from 'styled-components';

interface ContainerProps {
  $opened?: boolean;
}

export const Container = styled.header<ContainerProps>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  margin-left: ${({ $opened = true }) => ($opened ? '280px' : '64px')};
  transition: margin 0.4s;
  width: ${({ $opened = true }) => ($opened ? 'calc(100vw - 280px)' : '98%')};
  background: ${({ theme }) => theme.palette.mode === 'dark' 
    ? 'linear-gradient(90deg, #8a0438 0%, #1a0f1a 100%)'
    : 'linear-gradient(90deg, #c60463 0%, #8a0438 100%)'};
  box-shadow: ${({ theme }) => theme.palette.mode === 'dark'
    ? '0 2px 8px rgba(0, 0, 0, 0.6)'
    : '0 2px 8px rgba(198, 4, 99, 0.3)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.dark};
`;

export const Search = styled.div`
  width: 100%;
  padding: 0 32px 0;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 0 32px 0;
  gap: 8px;
  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.palette.primary.light};
  }
  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }
`;

export const PopperContent = styled.div`
  background: ${({ theme }) => theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #1e1e1e 0%, #1a0f1a 100%)'
    : 'linear-gradient(135deg, #fff 0%, #fce4ec 100%)'};
  padding: 1rem;
  margin: 1rem 2rem 0 0;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(0, 0, 0, 0.5)'
    : '0 4px 12px rgba(198, 4, 99, 0.1)'};
  border: 1px solid ${({ theme }) => theme.palette.mode === 'dark'
    ? 'rgba(198, 4, 99, 0.2)'
    : 'rgba(198, 4, 99, 0.1)'};
  overflow: hidden;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.palette.mode === 'dark'
      ? '0 4px 8px rgba(198, 4, 99, 0.4)'
      : '0 4px 8px rgba(198, 4, 99, 0.3)'};
    transform: translateY(-2px);
  }
`;

export const HeaderPopperContent = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1.1rem;
`;

export const BodyPopperContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 250px;
  min-width: 200px;
`;
