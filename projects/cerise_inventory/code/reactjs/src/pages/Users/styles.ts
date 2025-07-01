//https://www.npmjs.com/package/simplebar-react

// import SimpleBar from 'simplebar-react';
// import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import styled from 'styled-components';

// export const Scrollbar = styled(SimpleBar)``;

export const Container = styled(Grid)`
    display: flex;
    > h2 {
        padding: 1.5rem 0 0 2rem;
    }
`;

export const Content = styled(Grid)`
display: flex;
flex-direction: column;
background-color: ${({ theme }) => theme.palette.grey[200]};
`;