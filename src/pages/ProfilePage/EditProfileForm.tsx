import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import Candidate from '../../interfaces/CandidateInterface';
import { useLocation } from 'react-router-dom';
import { getDataFromId, updateCandidateData} from '../../api/getData';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { z } from 'zod';

function EditProfileForm() {
  const [showButton, setShowButton] = useState(false);

  const handleModeEditIconClick = () => {
    setShowButton(true);
  };
  const handleCloseEdit = () => {
    setShowButton(false);
  }
  const location = useLocation();
  const candidateId = Number(location.search.split('?')[1]);
  const [candidates, setCandidate] = useState<Candidate[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await getDataFromId(candidateId)
      setCandidate(response.data);
      console.log(candidates[0].profilePicPath)

    };

    fetchData();
  }, [candidateId]);

  if (!candidates) {
    return <div>Loading...</div>;
  }
  
  const handleSubmit = (event: any) => {
    event.preventDefault(); // prevent the default form submission behavior
    const emailInput = document.getElementById('mail') as HTMLInputElement;
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const resumePathInput = document.getElementById('file') as HTMLInputElement;
    const picturePathInput = document.getElementById('picture') as HTMLInputElement;
    const interviewDateInput = document.getElementById('calendar') as HTMLInputElement;

    const formData = {
        candidateId: 0,
        statusID: 1,
        name: nameInput.value,
        email: emailInput.value,
        score: 0,
        interviewDate: interviewDateInput.value,
        phoneNumber: phoneInput.value,
        resumeFilePath: resumePathInput.value,
        profilePicPath: picturePathInput.value,
        cvPath: "string"
    };
  

    const schema = z.object({
        candidateId: z.number(),
        statusID: z.number(),
        name: z.string().min(3, 'Name must be at least 3 characters long'),
        email: z.string().email('Invalid email address'),
        score: z.number(),
        interviewDate: z.string(),
        phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits long'),
        resumeFilePath: z.string(),
        profilePicPath: z.string(),
        cvPath: z.string()
    });

    try {
        schema.parse(formData);

        updateCandidateData(candidateId,formData)
            .then((response: { data: object; }) => {
               
                // window.location.reload()
                
                alert("candidate data updated !") 
         
            })
            .catch((error: any) => {
                console.error(error);
            });
    } catch (error) {
        alert('Form data is Invalid:');
    }
}
  

  return (
    <div>

      {candidates.map((candidate: Candidate) => (
        <div key={candidate.candidateId}>
         
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
               <Avatar alt= "" src= {candidate.profilePicPath} sx={{ width: 200, height: 200, borderRadius: '50%', display : "flex" , justifyContent : "center",marginBottom : "20px"}} />
              {candidate.name} {candidate.score}
            </Typography>
            <div style={{ marginLeft: '10px' }}>
              <ModeEditIcon onClick={handleModeEditIconClick} />
            </div>
          </div> 

          <br />
          <Divider color="neutral" />
          <br />

          <form onSubmit={handleSubmit} >
            <Box sx={{
              display: 'flex',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'white',
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  autoFocus
                  id="mail"
                  label="Email Address"
                  type="email"
                  variant="standard"
                  defaultValue={candidate.email}
                

                />
                <TextField
                  autoFocus
                  id="name"
                  label="Name"
                  type="name"
                  variant="standard"
                  defaultValue={candidate.name}
               
                />
                <TextField
                  autoFocus
                  id="phone"
                  label="Phone Number"
                  type="phone"
                  variant="standard"
                  defaultValue={candidate.phoneNumber}
                
                />
                <TextField
                  autoFocus
                  id="file"
                  label="Resume Path"
                  type=""
                  variant="standard"
                  
                  defaultValue={candidate.resumeFilePath}
                
                />
                <TextField
                  autoFocus
                  id="picture"
                  label="Picture Path"
                  type=""
                  variant="standard"
                  defaultValue={candidate.profilePicPath}
                
                />
                <TextField
                  focused
                  id="calendar"
                  label="Interview Date"
                  type="date"
                  variant="standard"
                  defaultValue={candidate.interviewDate}
               
                />
              </Box>
            </Box>
            <br />
            {showButton && (
              <>
                <Button
                  variant="contained" onClick={handleCloseEdit}
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type='submit'
                  style={{ color: "white" }}
                 
                  
                >
                  Submit
                </Button>
              </>
            )}
          </form>
        </div>
      ))}
    </div>
  );
}

export default EditProfileForm;