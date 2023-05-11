import {
	DragDropContext,
	DropResult,
	ResponderProvided,
} from "react-beautiful-dnd"
import CandidateBoardContext from "./CandidateBoardContext"
import ColumnDroppable from "./ColumnDroppable"
import { Grid } from "@mui/material"
import { useContext } from "react"
import FormDialog from "../../components/AddCandidateDialog"

export interface IBoardColumn {
	columnID: number
	title: string
}

function CandidateBoard() {
	const { onChangeCandidateStatus } = useContext(CandidateBoardContext)

	const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
		// When drop to unknown area
		if (!result.destination) return

		const { source, destination, draggableId } = result
		// When drop to other column, change status
		if (source.droppableId !== destination.droppableId) {
			
			onChangeCandidateStatus(draggableId, destination.droppableId as any)
			
		}

		// TODO: When drop the same column, it should be sorted
		else if (source.droppableId === destination.droppableId) {
			return
		}
	}
	return (
		<><FormDialog /><DragDropContext onDragEnd={onDragEnd}>
			<Grid container sx= {{padding : "0px 50px"}} spacing={2} >
				<Grid item xs={3} >
					<ColumnDroppable
						column={{
							title: "Applied",
							columnID: 0,
						}} />
				</Grid>
				<Grid item xs={3}>
					<ColumnDroppable
						column={{
							title: "Interview",
							columnID: 1,
						}} />
				</Grid>
				<Grid item xs={3}>
					<ColumnDroppable
						column={{
							title: "Pass",
							columnID: 2,
						}} />
				</Grid>
				<Grid item xs={3}>
					<ColumnDroppable
						column={{
							title: "Reject",
							columnID: 3,
						}} />
				</Grid>
			</Grid>
		</DragDropContext></>
	)
}

export default CandidateBoard

// import {
// 	DragDropContext,
// 	DropResult,
// 	ResponderProvided,
// } from "react-beautiful-dnd"
// import CandidateBoardContext from "./CandidateBoardContext"
// import ColumnDroppable from "./ColumnDroppable"
// import { Grid } from "@mui/material"
// import { useContext } from "react"

// export interface IBoardColumn {
// 	columnID: number
// 	title: string
// }

// function CandidateBoard() {
// 	const { onChangeCandidateStatus } = useContext(CandidateBoardContext)

// 	const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
// 		// When drop to unknown area
// 		if (!result.destination) return

// 		const { source, destination, draggableId } = result
// 		// When drop to other column, change status
// 		if (source.droppableId !== destination.droppableId) {
// 			onChangeCandidateStatus(draggableId, destination.droppableId as any)
// 		}

// 		// TODO: When drop the same column, it should be sorted
// 		else if (source.droppableId === destination.droppableId) {
// 			return
// 		}
// 	}
// 	return (
// 		<DragDropContext onDragEnd={onDragEnd}>
// 			<Grid container spacing={2}>
// 				<Grid item xs={3}>
// 					<ColumnDroppable
// 						column={{
// 							title: "Applied",
// 							columnID: 0,
// 						}}
// 					/>
// 				</Grid>
// 				<Grid item xs={3}>
// 					<ColumnDroppable
// 						column={{
// 							title: "Interview",
// 							columnID: 1,
// 						}}
// 					/>
// 				</Grid>
// 				<Grid item xs={3}>
// 					<ColumnDroppable
// 						column={{
// 							title: "Pass",
// 							columnID: 2,
// 						}}
// 					/>
// 				</Grid>
// 				<Grid item xs={3}>
// 					<ColumnDroppable
// 						column={{
// 							title: "Reject",
// 							columnID: 3,
// 						}}
// 					/>
// 				</Grid>
// 			</Grid>
// 		</DragDropContext>
// 	)
// }

// export default CandidateBoard