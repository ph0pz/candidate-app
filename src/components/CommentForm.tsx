import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box, DialogContentText, Divider, Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getComment, deleteComment } from '../api/getData';
import Comment from '../interfaces/CommentInterface';
import SaveIcon from '@mui/icons-material/Save';
import { updateComment } from '../api/getData';
import Candidate from '../interfaces/CandidateInterface';
import { addComment } from '../api/getData';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { IconButton } from '@mui/material';
function CommentForm() {
  const [comments  , setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState<null | number>(null);
  const [updatedCommentText, setUpdatedCommentText] = useState({ commentText: '' });
  const [open, setOpen] = React.useState(false);


  const candidateId = Number(location.search.split('?')[1]);
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await getComment(candidateId);
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComment();
  }, []);

  const handleDeleteComment = async (commentId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this comment?');
    if (confirmed) {
      try {
        await deleteComment(commentId);
        setComments((prevComments) => prevComments.filter((comment: Comment) => comment.commentId !== commentId));
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleAddComment = (event: any) => {
    event.preventDefault(); 
    const addNewComment = document.getElementById('new_comment') as HTMLInputElement;
    try {

      addComment(candidateId, addNewComment.value);
      window.location.reload()
      
      

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          color="black"
          textAlign="left"
          marginLeft={1}
          marginTop={2}
          marginRight={1}
          marginBottom={2}
          fontWeight="bold"
        >
          Evaluation and Score
        </Typography>
        <IconButton color="primary" onClick={handleClickOpen}>
      <AddCircleOutlineIcon />
    </IconButton>

        <div style={{ marginLeft: '10px' }}>

        </div>
        <br />
        <Divider color="neutral" />
        <br />
      </div>
      <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Comment</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Add new comment to this candidate.
                  </DialogContentText>
                  <br />
                  <TextField

                   id="new_comment"
                   label="Comment"
                   multiline
                   rows={4}
                  
                  
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button sx = {{backgroundColor : '#394867' , color : 'white'}} onClick={handleAddComment}>Add new comment </Button>
                </DialogActions>
              </Dialog>
      <form action="">
        {comments.map((comment: Comment) => (
          <Box
            key={comment.commentId}
            sx={{
              display: 'flex',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'white',
              marginTop: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>

              <TextField
                id={`comment-${comment.commentId}`}
                label="Comment"
                multiline
                rows={4}
                value={
                  editingCommentId === comment.commentId
                    ? updatedCommentText.commentText
                    : comment.commentText
                }
                onChange={(event) =>
                  setUpdatedCommentText({ commentText: event.target.value })
                }
                onBlur={() => setEditingCommentId(null)}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 2 }}>
              <ModeEditIcon
                color="action"
                onClick={() => setEditingCommentId(comment.commentId)}
              />
              <DeleteIcon color="action" onClick={() => handleDeleteComment(comment.commentId)} />
              <SaveIcon
                color="action"
                onClick={async () => {
                  try {
                    const updatedComment = {
                      commentId: comment.commentId,
                      candidateId: candidateId,
                      candidate: {
                        "candidateId": 0,
                        "statusID": 0,
                        "name": "string",
                        "email": "string",
                        "score": 0,
                        "interviewDate": "string",
                        "phoneNumber": "string",
                        "resumeFilePath": "string",
                        "profilePicPath": "string",
                        "cvPath": "string"

                      },
                      commentText: updatedCommentText.commentText
                    };

                    await updateComment(comment.commentId, updatedComment);
                    setEditingCommentId(null);
                    setUpdatedCommentText({ commentText: '' });
                    // Refresh the comments list after editing is complete
                    const response = await getComment(candidateId);
                    setComments(response.data);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              />
            </Box>
          </Box>
        ))}
      </form>
    </>
  );
}

export default CommentForm;