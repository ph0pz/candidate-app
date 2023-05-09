import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button, Divider, Typography } from '@mui/material'
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Evaluation from '../interfaces/EvaluationInterface';
import { getScoreFromId, updateCalScore } from '../api/getData';
import { updateEvaluationScore } from '../api/getData';
function ScoreForm() {
  const candidateId = Number(location.search.split('?')[1]);
  const [evaluation, setEvaluation] = useState<Evaluation[]>([]);
  const [teamwork, setTeamworkScore] = useState<number>(0);
  const [experience, setExperienceScore] = useState<number>(0);
  const [attitude, setAttitudeScore] = useState<number>(0);
  const [personality, setPersonalityScore] = useState<number>(0);
  const [skill, setSkillsScore] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getScoreFromId(candidateId)

      setEvaluation(response.data);
      setTeamworkScore(response.data[0].score)
      setExperienceScore(response.data[1].score)
      setAttitudeScore(response.data[2].score)
      setPersonalityScore(response.data[3].score)
      setSkillsScore(response.data[4].score)

    };

    fetchData();
  }, [candidateId]);


  const [showButton, setShowButton] = useState(false);

  const handleModeEditIconClick = () => {
    setShowButton(true);
  };
  const handleCloseEdit = () => {
    const handleCloseEdit = () => {
      setTeamworkScore(evaluation[0].score);
      setExperienceScore(evaluation[1].score);
      setAttitudeScore(evaluation[2].score);
      setPersonalityScore(evaluation[3].score);
      setSkillsScore(evaluation[4].score);
      setShowButton(false);
    };
    setShowButton(false);
  }
  const handleSubmit = async () => {
    const avgScore = (teamwork + personality + attitude + skill + experience) / 5;
    const candidateDefault = {
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
    }
    const defaultDescription = ["Teamwork","Experience","Attitude","Personality","Skill"]
    const newValue = [teamwork,experience,attitude,personality,skill]
    for (let i = 0; i <=4 ; i++){
      const response = await updateEvaluationScore(evaluation[i].evaluationId,{
        "evaluationId": evaluation[i].evaluationId,
        "candidateId": candidateId,
        "candidate": candidateDefault,
        "scoreType": i,
        "score": newValue[i],
        "scoreTypeDescription": defaultDescription[i]
      }
       )
    }

    
    
    await updateCalScore(candidateId,avgScore)
    console.log("avg score",candidateId);
    console.log(avgScore)
    window.location.reload()

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
        <div style={{ marginLeft: '10px' }}>
          <ModeEditIcon onClick={handleModeEditIconClick} />
        </div>
      </div>


      <br />
      <Divider color="neutral" />
      <br /><form action="">

        <Box sx={{
          display: 'flex',
          padding: "10px",
          borderRadius: '10px',
          backgroundColor: 'white',
        }}>
          {/* {evaluation.map((e : Evaluation) => (
            key = {e.evaluationId} */}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus
              id="team"
              label="Teamwork"
              type = "number"
              InputLabelProps={{
                shrink: true,
              }}
              value={teamwork}
              onChange={(event) => setTeamworkScore(Number(event.target.value))}


              variant="standard" />

            <TextField
              autoFocus
              id="exp"
              label="Experience"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={experience}
              onChange={(event) => setExperienceScore(Number(event.target.value))}
              variant="standard" />


            <TextField
              autoFocus
              id="atd"
              label="Attitude"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={attitude}
              onChange={(event) => setAttitudeScore(Number(event.target.value))}
              variant="standard" />
            <TextField
              autoFocus
              id="personal"
              label="Personality"
              type="number"
              onChange={(event) => setPersonalityScore(Number(event.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
              value={personality}
              variant="standard" />
            <TextField
              autoFocus
              id="skill"
              label="Skills"
              type="number"
              onChange={(event) => setSkillsScore(Number(event.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
              value={skill}
              variant="standard" />
          </Box>
          {/* ))} */}


          <br />

        </Box>


      </form>
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
            onClick={handleSubmit}
            style={{ color: "white" }}


          >
            Submit
          </Button>
        </>
      )}
    </>

  )
}

export default ScoreForm