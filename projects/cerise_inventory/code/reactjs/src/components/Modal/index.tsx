import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface CustomModalProps {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  onClose: () => void;
  defaultActions?: boolean;
}

export default function CustomModal({
  children,
  title,
  open,
  onClose,
  defaultActions = false,
}: CustomModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>

        <DialogActions>
          {defaultActions && (
            <>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
