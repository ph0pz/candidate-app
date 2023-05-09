
import { Typography } from '@mui/material'
const title = ["Applied","Pending","Reject","Pass"]
function StatusTitle(props : any) {

    return <Typography
      variant="h5" component="h2" marginLeft={5} marginTop={2} textAlign={'left'} fontWeight="bold" fontStyle={'italic'} >
      {title[props.index]}
    </Typography>
    
  }

export default StatusTitle