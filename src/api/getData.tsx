import axios from "axios";

const getData = async (statusId: number) => {
    return await axios.get(`https://localhost:7079/api/candidate/status/${statusId}`);
  };
const postNewCandidate =async (data : object) => {
    return await axios.post(`https://localhost:7079/api/candidate`,data);
}
const getDataFromId = async (candidateId: number) => {
    return await axios.get(`https://localhost:7079/api/candidate/${candidateId}`);
  };
const getAllCandidate =async () => {
    return await axios.get(`https://localhost:7079/api/candidate`);
}

const updateCandidateData =async (candidateId : number,data:object) => {
    return await axios.put(`https://localhost:7079/api/candidate/${candidateId}`,data);
}
const getScoreFromId= async (candidateId: number) => {
  return await axios.get(`https://localhost:7079/api/score/${candidateId}`);
};

const deleteCandidateFromId = async (candidateId: number) => {
  return await axios.delete(`https://localhost:7079/api/candidate/${candidateId}`);
};

const addDefaultScore =async (candidateId: number ,scoreType : number,score : number, scoreTypeDescription : string) => {
  return await axios.post(`https://localhost:7079/api/score/${candidateId}/${scoreType}/${score}/${scoreTypeDescription}`)
};

const updateEvaluationScore =async (evaluationId:number, evaluation : object) => {
    return await axios.put(`https://localhost:7079/api/score/${evaluationId}`,evaluation);
}

const updateCalScore =async (candidateId:number,score : number) => {
  return await axios.put(`https://localhost:7079/api/candidate/${candidateId}/${score}`);
}

const getComment = async (candidateId: number) => {
    return await axios.get(`https://localhost:7079/api/comment/${candidateId}`);
}

const deleteComment =async (commentId:number) => {
  return await axios.delete(`https://localhost:7079/api/comment/${commentId}`);
}

const addComment =async (candidateId:number, commentText : string) => {
  return await axios.post(`https://localhost:7079/api/comment/${candidateId}/${commentText}`);
}

const updateComment =async (commentId : number, data:object) => {
  return await axios.put(`https://localhost:7079/api/comment/${commentId}`,data);
}

const changeStatus =async (candidateId: number, statusId : number) => {
  return await axios.put(`https://localhost:7079/api/candidate/candidateId/${statusId}?candidateId=${candidateId}`);
}
// const getData = async () => {
//     return await axios.get(`https://localhost:7079/api/candidate/`);
//   };
// const postCandidate = (data) => {
//     axios.post('https://localhost:7079/api/candidate',{...data})
// }
export {
    getData,
    postNewCandidate,
    getDataFromId,
    updateCandidateData,
    getScoreFromId,
    deleteCandidateFromId,
    addDefaultScore,
    updateEvaluationScore,
    updateCalScore,
    getComment,
    deleteComment,
    addComment,
    updateComment,
    changeStatus
}