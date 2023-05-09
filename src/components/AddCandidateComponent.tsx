import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { postNewCandidate } from "../api/getData"

import { z } from "zod"

const schemaValidate = z.object({
    candidateId: z.number(),
    statusID: z.number(),
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    score: z.number(),
    interviewDate: z.string(),
    phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 digits long"),
    resumeFilePath: z.string(),
    profilePicPath: z.string(),
    cvPath: z.string(),
})

function AddCandidateComponent(
    {onSubmitSuccess}: {
        onSubmitSuccess: () => void
    }
) {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleSubmit = (event: any) => {
		event.preventDefault() // prevent the default form submission behavior
		const emailInput = document.getElementById("mail") as HTMLInputElement
		const nameInput = document.getElementById("name") as HTMLInputElement
		const phoneInput = document.getElementById("phone") as HTMLInputElement
		const resumePathInput = document.getElementById("file") as HTMLInputElement
		const picturePathInput = document.getElementById(
			"picture"
		) as HTMLInputElement
		const interviewDateInput = document.getElementById(
			"calendar"
		) as HTMLInputElement

		const formData = {
			candidateId: 0,
			statusID: 0,
			name: nameInput.value,
			email: emailInput.value,
			score: 0,
			interviewDate: interviewDateInput.value,
			phoneNumber: phoneInput.value,
			resumeFilePath: resumePathInput.value,
			profilePicPath: picturePathInput.value,
			cvPath: "string",
		}

		try {
			schemaValidate.parse(formData)
			console.log("Form data is valid")

			postNewCandidate(formData)
				.then((response) => {
					console.log(response.data)
                    onSubmitSuccess()
					// window.location.reload()
					// handleDefaultScore(response.data.candidateId)
					// handleClose()

					// close the dialog after successful submission
				})
				.catch((error) => {
					console.error(error)
				})
		} catch (error) {
			alert("Form data is invalid:")
			console.error("Form data is invalid:", error)
		}
		// const typeDesArr = [
		// 	"Teamwork",
		// 	"Experience",
		// 	"Attitude",
		// 	"Personality",
		// 	"Skills",
		// ]
		// const defaultScore = {
		// 	evaluationId: 0,
		// 	candidateId: 0,
		// 	scoreType: 0,
		// 	score: 0,
		// 	scoreTypeDescription: typeDesArr[0],
		// }
		// const handleDefaultScore = (candidateId: number) => {
		// 	addDefaultScore(
		// 		candidateId,
		// 		defaultScore.scoreType,
		// 		defaultScore.score,
		// 		(defaultScore.scoreTypeDescription = typeDesArr[0])
		// 	)
		// 	addDefaultScore(
		// 		candidateId,
		// 		(defaultScore.scoreType += 1),
		// 		defaultScore.score,
		// 		(defaultScore.scoreTypeDescription = typeDesArr[1])
		// 	)
		// 	addDefaultScore(
		// 		candidateId,
		// 		(defaultScore.scoreType += 1),
		// 		defaultScore.score,
		// 		(defaultScore.scoreTypeDescription = typeDesArr[2])
		// 	)
		// 	addDefaultScore(
		// 		candidateId,
		// 		(defaultScore.scoreType += 1),
		// 		defaultScore.score,
		// 		(defaultScore.scoreTypeDescription = typeDesArr[3])
		// 	)
		// 	addDefaultScore(
		// 		candidateId,
		// 		(defaultScore.scoreType += 1),
		// 		defaultScore.score,
		// 		(defaultScore.scoreTypeDescription = typeDesArr[4])
		// 	)
		// }
	}
	return (
		<div>
			<Button
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					position: "top",
					right: "20px",
					bottom: "20px",
					bgcolor: "#394867",
					color: "white",
					marginLeft: "20px",
					textTransform: "none",
				}}
				onClick={() => {
					handleClickOpen()
					console.log("Button clicked!")
				}}
			>
				<IconButton sx={{ color: "white" }}>
					<AddIcon />
				</IconButton>
				<span style={{ marginRight: "5px" }}>Add Candidate</span>
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Candidate</DialogTitle>
				<DialogContent>
					<DialogContentText>Add Candidate Detail.</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="mail"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						type="name"
						fullWidth
						variant="standard"
						// error={Boolean(Error?.name)}
						// helperText={Error?.name}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="phone"
						label="Phone Number"
						type="phone"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						id="file"
						label="ResumePath"
						type=""
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						id="picture"
						label="PicturePath"
						type=""
						fullWidth
						variant="standard"
					/>
					<TextField
						focused
						margin="dense"
						id="calendar"
						label="InterviewDate"
						type="date"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleClose}
						style={{ color: "white" }}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						style={{ color: "white" }}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
export default AddCandidateComponent
