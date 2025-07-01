import styled from 'styled-components';
import login from '@/assets/images/login.png';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 0 10rem 0 10rem;
  gap: 2rem;
  width: 45rem;

  > img {
    align-self: center;
    width: fit-content;
  }

  > form {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    gap: 1rem;
  }

  > span {
    width: fit-content;
    text-align: right;
    cursor: pointer;
    justify-self: right;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Login = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 50vw;

  > span {
    a {
      cursor: pointer;
      color: blue;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const Image = styled.div`
  background: url(${login}) no-repeat center;
  width: 50vw;
  flex: 1;
  object-fit: cover;
`;

export const MessageError = styled.span`
  color: red;
  font-size: 1rem;
  text-align: center;
  width: 100%;
  display: block;
`;
