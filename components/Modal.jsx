"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Modal = ({ open, handleClose, title, content, actions, scrollType = 'paper' }) => {
  const descriptionElementRef = React.useRef(null);
  
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scrollType}
      aria-labelledby="reusable-dialog-title"
      aria-describedby="reusable-dialog-description"
      fullWidth
    >
      <DialogTitle id="reusable-dialog-title">{title}</DialogTitle>
      <DialogContent dividers={scrollType === 'paper'}>
        <DialogContentText
          id="reusable-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
