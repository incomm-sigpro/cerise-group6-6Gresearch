import { Button } from '@mui/material';
import styled from 'styled-components';

interface ContainerProps {
  $active: boolean;
}

export const Container = styled(Button)<ContainerProps>`
  && {
    justify-content: left;
    font-family: 'Ubuntu';
    display: flex;
    /* margin: 0 12px 0 12px; */ //TODO: remover isso resolve para o item config mas n sei se interfere nos outros, testar
    border-radius: 8px;
    padding-left: 18px;
    gap: 0.7rem;
    background-color: ${({ $active }) =>
      $active ? 'rgba(255, 255, 255, 0.04)' : 'transparent'};
    color: ${({ $active }) => ($active ? '#fff' : 'rgb(157, 164, 174)')};
    transition: background-color 0.3s;
    text-transform: none;

    svg {
      fill: ${({ $active }) =>
        $active ? 'rgb(99, 102, 241)' : 'rgb(157, 164, 174)'};
    }

    &:hover {
      background-color: ${({ $active }) =>
        $active ? 'rgba(255, 255, 255, 0.04)' : 'transparent'};
    }

    &.MuiButtonBase-root:active {
      background-color: ${({ $active }) =>
        $active ? 'rgba(255, 255, 255, 0.04)' : 'transparent'};
    }
  }
`;
