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
  background-color: ${({ theme }) => theme.palette.grey[200]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
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
  }
  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }
`;

export const PopperContent = styled.div`
  background-color: #fff;
  padding: 1rem;
  margin: 1rem 2rem 0 0;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  overflow: hidden;
`;

export const HeaderPopperContent = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px ${({ theme }) => theme.palette.grey[900]} solid;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  font-weight: bold;
`;

export const BodyPopperContent = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 250px;
  min-width: 200px;
`;
