import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	Typography,
} from "@mui/material"
import { Draggable } from "react-beautiful-dnd"
import Candidate from "../../interfaces/CandidateInterface"

import ScoreBox from "./ScoreBox"

function CardDraggable({

	index,
	candidate,
}: {
	candidate: Candidate
	index: number
}) {
	
	function handleAvatarClick(candidate: Candidate): void {
		window.location.href = `/Profile?${candidate.candidateId}`;
	}
	
	return (
		<><Draggable key={candidate.candidateId} draggableId={candidate.candidateId.toString()} index={index}>
			{(provided) => (
				<><Card

					variant="outlined"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					sx={{
						mb: 2,
					}}
				>
					<Grid container spacing={1} alignItems="center">
						<Grid item marginLeft={1}>
							<Avatar src= {candidate.profilePicPath} onClick={() => handleAvatarClick(candidate)} />
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
								<br />
								{candidate.interviewDate}
							</Typography>

							<ScoreBox score={candidate.score} />

							<br />
						</Grid>
					</Grid>
				</Card></>
			)}
		</Draggable></>
	)
}

export default CardDraggable

// import {
// 	Avatar,
// 	Card,
// 	CardContent,
// 	CardHeader,
// 	IconButton,
// 	Typography,
// } from "@mui/material"
// import { Draggable } from "react-beautiful-dnd"
// import Candidate from "../../interfaces/CandidateInterface"
// import { red } from "@mui/material/colors"

// function CardDraggable({
// 	index,
// 	candidate,
// }: {
// 	candidate: Candidate
// 	index: number
// }) {
// 	return (
// 		<Draggable key={candidate.candidateId} draggableId={candidate.candidateId.toString()} index={index}>
// 			{(provided) => (
// 				<Card
// 					variant="outlined"
// 					ref={provided.innerRef}
// 					{...provided.draggableProps}
// 					{...provided.dragHandleProps}
// 					sx={{
// 						mb: 2,
// 					}}
// 				>
// 					<CardHeader
// 						avatar={
// 							<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
// 								IT
// 							</Avatar>
// 						}
// 						title={candidate.name}
// 						subheader={candidate.statusId}
// 					/>
// 					<CardContent>
// 						<Typography variant="h5" component="div">
// 							Lorem ipsum dolor
// 						</Typography>
// 					</CardContent>
// 				</Card>
// 			)}
// 		</Draggable>
// 	)
// }

// export default CardDraggable