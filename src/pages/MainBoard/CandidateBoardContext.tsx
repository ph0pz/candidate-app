import { ReactElement, createContext, useCallback, useState } from "react"
import axios from "axios";
import * as React from 'react';
import { changeStatus } from "../../api/getData";
import Candidate from "../../interfaces/CandidateInterface";

export enum ColumnType {
	applied = "applied",
	interview = "interview",
	pass = "pass",
	reject = "reject",
}



export interface ICandidateBoardContext {
	candidateLists: Candidate[]
	onChangeCandidateStatus: (
		candidateID: string,
		destinationStatus: ColumnType
	) => void
}

const CandidateBoardContext = createContext<ICandidateBoardContext>(
	{} as ICandidateBoardContext
)

export default CandidateBoardContext



export function CandidateBoardContextProvider({
	children,
}: {
	children: ReactElement
}) {

    const [candidateLists, setCandidateLists] =
        useState<Candidate[]>([])

    React.useEffect(() => {
        const url = 'https://localhost:7079/api/candidate';
        axios.get(url).then((res) => {
            console.log(res.data)
        setCandidateLists(res.data);
        });
    }, []);

	const onChangeCandidateStatus = useCallback(
		(candidateId: string, destinationStatus: ColumnType) => {
			const newStatus = parseInt(destinationStatus,10)
			setCandidateLists((prev) =>
				prev.map((m) => {
					if (candidateId === m.candidateId.toString()) {
						
						console.log("new sttes",newStatus)
						changeStatus(m.candidateId,newStatus)
						return {
							...m,
							statusID: newStatus,
							
						}
						
					}
				
					return m
				})
			)
		},
		[]
	)

	return (
		<CandidateBoardContext.Provider
			value={{
				candidateLists,
				onChangeCandidateStatus,
			}}
		>
			{children}
		</CandidateBoardContext.Provider>
	)
}


// import { ReactElement, createContext, useCallback, useState } from "react"
// import axios from "axios";
// import * as React from 'react';
// import Candidate from "../../interfaces/CandidateInterface";
// export enum ColumnType {
// 	applied = "applied",
// 	interview = "interview",
// 	pass = "pass",
// 	reject = "reject",
// }




// export interface ICandidateBoardContext {
// 	candidateLists: Candidate[]
// 	onChangeCandidateStatus: (
// 		candidateID: string,
// 		destinationStatus: ColumnType
// 	) => void
// }

// const CandidateBoardContext = createContext<ICandidateBoardContext>(
// 	{} as ICandidateBoardContext
// )

// export default CandidateBoardContext



// export function CandidateBoardContextProvider({
// 	children,
// }: {
// 	children: ReactElement
// }) {

//     const [candidateLists, setCandidateLists] =
//         useState<Candidate[]>([])

//     React.useEffect(() => {
//         const url = 'https://localhost:7079/api/candidate';
//         axios.get(url).then((res) => {
//             console.log(res.data)
//         setCandidateLists(res.data);
//         });
//     }, []);

// 	const onChangeCandidateStatus = useCallback(
// 		(candidateID: string, destinationStatus: ColumnType) => {
// 			setCandidateLists((prev) =>
// 				prev.map((m) => {
// 					if (candidateID === m.candidateId.toString()) {
// 						return {
// 							...m,
// 							status: destinationStatus,
// 						}
// 					}
// 					return m
// 				})
// 			)
// 		},
// 		[]
// 	)

// 	return (
// 		<CandidateBoardContext.Provider
// 			value={{
// 				candidateLists,
// 				onChangeCandidateStatus,
// 			}}
// 		>
// 			{children}
// 		</CandidateBoardContext.Provider>
// 	)
// }