import React, { useContext } from "react";
import {
  Title,
  Text,
  Avatar,
  SmallContainer,
  Icon,
} from "components/Shared/Layout";
import NoteContext from "../../context/noteContext/noteContext";
const NoteItem = ({ note }) => {
  const { deleteNote } = useContext(NoteContext);

  const {
    title,
    description,
    _id,
    meeting,
    creator: { name, avatar },
  } = note;
  return (
    <>
      <SmallContainer display="flex">
        <Avatar src={avatar} />
        <Title fontSize="15px">{name}</Title>
      </SmallContainer>
      <SmallContainer width="100%" background="#E3E3E3" margin="5px">
        <Icon
          className="fas fa-trash-alt"
          float="right"
          marginRight="1rem"
          fontSize="1.2rem"
          marginTop=" 0.5rem"
          onClick={() => deleteNote(meeting, _id)}
        />
        <Title>{title}</Title>
        <Text>{description} </Text>
      </SmallContainer>
    </>
  );
};

export default NoteItem;
