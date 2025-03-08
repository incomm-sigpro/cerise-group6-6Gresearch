import styled from 'styled-components';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField)({
  '&:hover': {
    backgroundColor: 'rgba(17, 25, 39, 0.04)',
  },
  '& label.Mui-focused': {
    color: '#82BC00',
    fontWeight: 'bold',
  },
  '& .MuiInputBase-root ': {
    borderColor: '#ced4da',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '0.25rem',
    backgroundColor: 'none',
  },

  '& .MuiInputBase-root.Mui-focused ': {
    borderColor: '#82BC00',
    boxShadow: '0 0 1.225em #82bc004f',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '0.25rem',
    transition:
      'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },

  '& .MuiInputBase-root.Mui-error ': {
    borderColor: 'rgb(240, 68, 56)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '0.25rem',
    transition:
      'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },

  '& label.Mui-error': {
    color: 'rgb(240, 68, 56)',
    fontWeight: 'bold',
  },
});
