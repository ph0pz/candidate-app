import { Droppable } from "react-beautiful-dnd"
import { IBoardColumn } from "./CandidateBoard"
import { Box, Paper, Typography } from "@mui/material"
import { useContext } from "react"
import CandidateBoardContext from "./CandidateBoardContext"
import CardDraggable from "./CardDraggable"

function ColumnDroppable({ column }: { column: IBoardColumn }) {

	const { candidateLists } = useContext(CandidateBoardContext)
    console.log('candidateLists candidateLists: ', candidateLists)
	const items = candidateLists.filter((f) => f.status === column.columnID)

	return (
		<Droppable key={column.columnID} droppableId={column.columnID}>
			{(provided) => (
				<Box ref={provided.innerRef} {...provided.droppableProps}>
					<Typography>{column.title}</Typography>
					<Paper
						variant="outlined"
						sx={{
							height: "70vh",
							overflow: "auto",
							p: 2
						}}
					>
						{items.map((item, index) => (
							<CardDraggable index={index} candidate={item} key={item.idCandidate} />
						))}
						{provided.placeholder}
					</Paper>
				</Box>
			)}
		</Droppable>
	)
}

export default ColumnDroppable