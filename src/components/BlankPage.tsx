import React, { useState } from "react";
import Stack from "@mui/joy/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/joy/styles";

import EditProfileForm from "./EditProfileForm";
import ScoreForm from "./ScoreEditForm";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle , Box} from "@mui/material";

// Customize Stack
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteCandidateFromId } from "../api/getData";
import CommentForm from "./CommentForm";

const Item = styled(Card)(({ theme, color }) => ({
  backgroundColor: color,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 6,
  color: "black",
}));

const BlankPage = () => {
  const candidateId = Number(location.search.split('?')[1]);
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
    window.location.replace('/')
    setOpen(false);
  };

  return (
    <>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: '20px' }}>
      <img src="src\assets\profilePic/profile1" alt="image" style={{ width: '200px', height: '200px' }} />
    </div>
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
    </Box>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 15 }}
        >

          <Item color="#9BA4B5">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >

            </div>
            <EditProfileForm />
            <br />

            <br />
          </Item>
          <Item color="#9BA4B5">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >

            </div>
            <ScoreForm />
            <br />

            <br />
          </Item>
          <Item color="#9BA4B5">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >

            </div>
            <CommentForm />
            <br />

            <br />
          </Item>

        </Stack>
      </div>
      <Dialog
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
      </Dialog>


    </></>
  );
};

export default BlankPage;