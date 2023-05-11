import { Droppable } from "react-beautiful-dnd"
import { IBoardColumn } from "./CandidateBoard"
import { Box, Divider, Paper, Typography } from "@mui/material"
import { useContext } from "react"
import CandidateBoardContext from "./CandidateBoardContext"
import CardDraggable from "./CardDraggable"
import Candidate from "../../interfaces/CandidateInterface"
function ColumnDroppable({ column }: { column: IBoardColumn }) {

	const { candidateLists } = useContext(CandidateBoardContext)
	console.log("neab",candidateLists)
	
	const items = candidateLists.filter((f) => f.statusID === column.columnID)


	return (
		<Droppable key={column.columnID} droppableId={column.columnID.toString()}>
			{(provided) => (
				<Box ref={provided.innerRef} {...provided.droppableProps}>

					<Box sx={{backgroundColor : "#394867" , padding : "1px 0px" , borderRadius : "1rem"}}>
					<Paper

						variant="outlined"
						sx={{
							backgroundColor:
								column.title === "Applied"
									? "#F7D060" // Yellow
									: column.title === "Interview"
										? "#6087F7"
										: column.title === "Pass"
											? "#98D8AA"

											: "#FF6D60 ",
								margin : "5px 3px", // White (default color)


							height: "70vh",
							width: "40vh",
							overflow: "auto",
							p: 2,
							borderRadius: "1rem",

						}}
					>
						<Typography
							variant="h5" component="h2" marginLeft={5} marginTop={2} textAlign={'left'} fontWeight="bold" fontStyle={'italic'} >
							{column.title}
						</Typography>
						<br />
						<Divider color="neutral" />
						<br />
						



						{items.map((item, index) => (
							<CardDraggable index={index} candidate={item} key={item.candidateId} />
						))}
						{provided.placeholder}
					</Paper>
					</Box>

				</Box>
			)}
		</Droppable>
	)
}

export default ColumnDroppable


// import { Droppable } from "react-beautiful-dnd"
// import { IBoardColumn } from "./CandidateBoard"
// import { Box, Paper, Typography } from "@mui/material"
// import { useContext } from "react"
// import CandidateBoardContext from "./CandidateBoardContext"
// import CardDraggable from "./CardDraggable"

// function ColumnDroppable({ column }: { column: IBoardColumn }) {

// 	const { candidateLists } = useContext(CandidateBoardContext)
//     console.log('candidateLists candidateLists: ', candidateLists)
// 	const items = candidateLists.filter((f) => f.statusId === column.columnID)

// 	return (
// 		<Droppable key={column.columnID} droppableId={column.columnID.toString()}>
// 			{(provided) => (
// 				<Box ref={provided.innerRef} {...provided.droppableProps}>
// 					<Typography>{column.title}</Typography>
// 					<Paper
// 						variant="outlined"
// 						sx={{
// 							height: "70vh",
// 							overflow: "auto",
// 							p: 2
// 						}}
// 					>
// 						{items.map((item, index) => (
// 							<CardDraggable index={index} candidate={item} key={item.candidateId} />
// 						))}
// 						{provided.placeholder}
// 					</Paper>
// 				</Box>
// 			)}
// 		</Droppable>
// 	)
// }

// export default ColumnDroppable