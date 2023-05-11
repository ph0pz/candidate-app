import React, { useEffect, useState } from "react";
import Stack from "@mui/joy/Stack";
import Card from "@mui/material/Card";
import { styled } from "@mui/joy/styles";

import EditProfileForm from "./EditProfileForm";
import ScoreForm from "./ScoreEditForm";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle , Box} from "@mui/material";

// Customize Stack
import { IconButton } from '@mui/material';

import { deleteCandidateFromId, getDataFromId } from "../../api/getData";
import CommentForm from "./CommentForm";
import Avatar from '@mui/material/Avatar';
import Candidate from "../../interfaces/CandidateInterface";
import RemoveCandidateButton from "./RemoveCandidateButton";
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

  const [candidates, setCandidate] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDataFromId(candidateId)
      setCandidate(response.data);
      

    };

    fetchData();
  }, [candidateId]);


  return (
    <>
      <>
      <RemoveCandidateButton candidateId={candidateId} />
    <Box sx={{ display: "flex", justifyContent: "center" }}>
    
    
     
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
      

    </></>
  );
};

export default BlankPage;