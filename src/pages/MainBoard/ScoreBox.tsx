import { Box } from '@mui/material';

interface ScoreBoxProps {
  score: number;
}

function ScoreBox(props: ScoreBoxProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#394867',
          color: 'white',
          fontWeight: 400,
          borderRadius: '10px',
          padding: '8px 16px',
          marginLeft: '10px',
        }}
      >
        Score: {props.score}
      </Box>
    </Box>
  );
}

export default ScoreBox;