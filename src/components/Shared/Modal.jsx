import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  primaryButtonLabel = 'Close',
  footerButtons = null,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      {/* Modal Title */}
      {title && <DialogTitle>{title}</DialogTitle>}

      {/* Modal Content */}
      <DialogContent>{children}</DialogContent>

      {/* Footer Buttons */}
      <DialogActions>
        {footerButtons}
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
        >
          {primaryButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
