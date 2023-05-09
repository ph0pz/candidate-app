import { Card, Grid, Avatar, Typography, Box } from '@mui/material';
import ScoreBox from './ScoreBox';
import { Link } from 'react-router-dom';
import Candidate from '../interfaces/CandidateInterface';
import * as z from 'zod';

interface CardInfoProps {
  candidates: Candidate[];
}

function CardInfo(props: CardInfoProps) {
  const handleAvatarClick = (candidate: Candidate) => {
    window.location.href = `/Profile?${candidate.candidateId}`;
  };

  return (
    <Box>
      {props.candidates.map((candidate) => (
        <Card key={candidate.candidateId} sx={{ my: 2 }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item marginLeft={1}>
              <Avatar onClick={() => handleAvatarClick(candidate)} />
            </Grid>
            <Grid item>
              <Typography
                color="black"
                textAlign="left"
                marginLeft={1}
                marginTop={2}
                marginRight={2}
                marginBottom={2}
                fontWeight="bold"
              >
                {candidate.name}
              </Typography>

              <ScoreBox score={candidate.score} />

              <br />
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  );
}

export default CardInfo;