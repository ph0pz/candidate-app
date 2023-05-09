import { ReactElement, createContext, useCallback, useState } from "react"
import axios from "axios";
import * as React from 'react';

export enum ColumnType {
	applied = "applied",
	interview = "interview",
	pass = "pass",
	reject = "reject",
}


export interface ICandidate {
    idCandidate: number;
    firstName: string;
    lastName: string;
    position:string;
    createAt: string;
    status: string;
    cv: string;
    resume: string;
    skills: string;
    email: string;
    rating: string;
    imageProfile: string;
    candidateName: string;
  }

export interface ICandidateBoardContext {
	candidateLists: ICandidate[]
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
        useState<ICandidate[]>([])

    React.useEffect(() => {
        const url = 'https://localhost:7166/api/Candidate';
        axios.get(url).then((res) => {
            console.log(res.data)
        setCandidateLists(res.data);
        });
    }, []);

	const onChangeCandidateStatus = useCallback(
		(candidateID: string, destinationStatus: ColumnType) => {
			setCandidateLists((prev) =>
				prev.map((m) => {
					if (candidateID === m.idCandidate.toString()) {
						return {
							...m,
							status: destinationStatus,
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