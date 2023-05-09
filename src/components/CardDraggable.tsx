import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	IconButton,
	Typography,
} from "@mui/material"
import { Draggable } from "react-beautiful-dnd"
import { ICandidate } from "./CandidateBoardContext"
import { red } from "@mui/material/colors"

function CardDraggable({
	index,
	candidate,
}: {
	candidate: ICandidate
	index: number
}) {
	return (
		<Draggable key={candidate.idCandidate} draggableId={candidate.idCandidate.toString()} index={index}>
			{(provided) => (
				<Card
					variant="outlined"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					sx={{
						mb: 2,
					}}
				>
					<CardHeader
						avatar={
							<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
								IT
							</Avatar>
						}
						title={candidate.candidateName}
						subheader={candidate.status}
					/>
					<CardContent>
						<Typography variant="h5" component="div">
							Lorem ipsum dolor
						</Typography>
					</CardContent>
				</Card>
			)}
		</Draggable>
	)
}

export default CardDraggable