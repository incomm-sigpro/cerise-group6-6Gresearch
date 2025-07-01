import styled from "styled-components";

export const Container = styled.div`
    width: 100%;	
    height: 100vh;

    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 105px 128px auto 64px;
    grid-template-areas:
    "header"
    "content";

    > header {
        grid-area: header;

        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 64px;

        width: calc(100vw - 280px);
        height: 100%;
    }
`;

export const Content = styled.div`
    grid-area: content;
    padding: 0 64px;
    overflow-y: auto;



    background-color: ${({ theme }) => theme.palette.grey[200]};

    width: 100vw;
    height: 100vh;
`;


export const Graphs = styled.div`
    grid-area: content;
    padding: 0 64px;
    overflow-y: auto;

    

    background-color: ${({ theme }) => theme.palette.grey[200]};

    width: 100vw;
    height: 100vh;
`;
