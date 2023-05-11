import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react'
import { deleteCandidateFromId } from '../../api/getData';
import ClearIcon from '@mui/icons-material/Clear';
function RemoveCandidateButton(props: { candidateId: any; } ) {
  const { candidateId } = props;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleConfirm = () => {
    console.log('Button clicked!');
    deleteCandidateFromId(candidateId)
    window.location.reload()
    window.location.replace('/')
    setOpen(false);
  };

  return (
    <><Box sx={{ display: "flex", justifyContent: "right" }}>
      <Button
        sx={{
          display: 'flex',
          justifyContent: 'right',
          right: '20px',
          bottom: '20px',
          bgcolor: '#FF6D60',
          color: 'white',
          marginLeft: '20px',
          textTransform: 'none'
        }}
        onClick={() => {
          handleClickOpen();

        } }
      >
        <IconButton sx={{ color: 'white' }}>
          <ClearIcon />
        </IconButton>
        <span style={{ marginRight: '5px' }}>Remove Candidate</span>
      </Button>

    </Box><Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this candidate?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog></>

  )
}

export default RemoveCandidateButton