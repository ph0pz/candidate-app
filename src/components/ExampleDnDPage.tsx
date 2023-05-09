import { Typography } from "@mui/material"
import { CandidateBoardContextProvider } from "./CandidateBoardContext"
import CandidateBoard from "./CandidateBoard"

function ExampleDnDPage() {
	return (
		<CandidateBoardContextProvider>
			<>
				<Typography>Example Board</Typography>
				<CandidateBoard />
			</>
		</CandidateBoardContextProvider>
	)
}

export default ExampleDnDPage