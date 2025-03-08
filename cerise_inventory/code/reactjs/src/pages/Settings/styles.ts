import styled from 'styled-components';

export const Container = styled.div`
display: flex;

> div div h2 {
    margin-bottom: 1.5rem;
}
`;

export const Content = styled.div`
grid-area: content;
padding: 0 64px;
overflow: auto;

display: flex;
flex-direction: column;
gap: 48px;

background-color: ${({ theme }) => theme.palette.grey[200]};

width: calc(100vw - 280px);
height: 100vh;
`;
