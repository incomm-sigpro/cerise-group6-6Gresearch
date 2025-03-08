import styled from 'styled-components';

export const Container = styled.div`
  width: calc(100vw - 280px);
  height: 100vh;

  > header {
    width: 100%;
    height: 144px;

    background: ${({ theme }) => theme.palette.grey[800]};

    display: flex;
    align-items: center;

    padding: 0 124px;

    svg {
      color: ${({ theme }) => theme.palette.primary.light};
      font-size: 24px;
    }
  }
`;

export const Form = styled.form`
  max-width: 340px;
  margin: 30px auto 60px;

  > div {
    margin-top: 12px;
  }

  > div:nth-child(5) {
    margin-top: 36px;
  }

  > button {
    margin-top: 24px;
  }
`;

export const Avatar = styled.form`
  position: relative;
  max-width: 340px;
  margin: -90px auto 0;

  width: 186px;
  height: 186px;

  > img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  > label {
    width: 48px;
    height: 48px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    bottom: 7px;
    right: 7px;

    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 60px;
      height: 60px;
      color: ${({ theme }) => theme.palette.primary.light};
    }
  }
`;

export const Footer = styled.footer`
  width: 100%;
  height: 56px;

  background: ${({ theme }) => theme.palette.grey[800]};
  color: ${({ theme }) => theme.palette.grey[100]};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 500;

  border-top: 5px solid ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.1);
`;
