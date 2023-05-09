import Stack from "@mui/joy/Stack";
import Card from "@mui/material/Card";

import { styled } from "@mui/joy/styles";
import Divider from "@mui/joy/Divider";
import CardInfo from "./CardInfo";
import StatusTitle from "./StatusTitle";

import FormDialog from "./AddCandidateComponent";

import { useState, useEffect, useCallback } from "react";
import Candidate from "../interfaces/CandidateInterface";

import { getData } from "../api/getData";
import EditProfileForm from "./EditProfileForm";
// Customize Stack

const Item = styled(Card)(({ theme, color }) => ({
  backgroundColor: color,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 6,
  color: "black",
}));

const getAllCandidateStatuses = async () =>  {

  await Promise.all([
    getData(0),
    getData(1),
    getData(2),
    getData(3)
  ])
}
const CardContainer = () => {
  const [candidates0, setCandidates0] = useState<Candidate[]>([]);
  const [candidates1, setCandidates1] = useState<Candidate[]>([]);
  const [candidates2, setCandidates2] = useState<Candidate[]>([]);
  const [candidates3, setCandidates3] = useState<Candidate[]>([]);

  const fetchData = useCallback(async () => {

    const [applyRes, interviewRes, passRes, rejectRes] = await getAllCandidateStatuses()
      setCandidates0(applyRes.data)
      setCandidates1(interviewRes.data)
      setCandidates2(passRes.data)
      setCandidates3(rejectRes.data)

  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    
    <> <FormDialog
        onSubmitSuccess={fetchData}
    /> <div style={{ display: "flex", justifyContent: "center" }}>
 
      <br />
      {/* <DragDropContext onDragEnd={onDragEnd}> */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item color="#F7D060">
          <StatusTitle index={0} />
          <br />
          <Divider color="neutral" />
          <br />
          <CardInfo candidates={candidates0} />
          <br />
        </Item>

        <Item color="#6087F7">
          <StatusTitle index={1} />
          <br />
          <Divider color="neutral" />
          <br />
          <CardInfo candidates={candidates1} />
          
        </Item>

        <Item color="#FF6D60">
          <StatusTitle index={2} />
          <br />
          <Divider color="neutral" />
          <br />
          <CardInfo candidates={candidates2} />
        </Item>

        <Item color="#98D8AA">
          <StatusTitle index={3} />
          <br />
          <Divider color="neutral" />
          <br />
          <CardInfo candidates={candidates3} />
        </Item>

      </Stack>
      {/* </DragDropContext> */}
    </div></>
  );
};

export default CardContainer;
