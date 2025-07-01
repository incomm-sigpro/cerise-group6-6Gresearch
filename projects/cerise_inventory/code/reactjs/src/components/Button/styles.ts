import styled from 'styled-components';
import { Button } from '@mui/material';

export const StyledButton = styled(Button)({
  '&.MuiButtonBase-root': {
    backgroundColor: '#82BC00',
    color: '#fff',
    border: '1px solid transparent',
    borderRadius: '5px',
    textTransform: 'none'
  },
  '&.MuiButtonBase-root:hover': {
    backgroundColor: '#82BC00',
    transition: 'box-shadow ease-in 0.3s',
  },
});
