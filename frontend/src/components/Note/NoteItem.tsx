import React, { useContext } from "react";
import {
  Title,
  Text,
  Avatar,
  SmallContainer,
  Icon,
  Divider,
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
        <Title color="#333333" fontSize="15px">
          {name}
        </Title>
      </SmallContainer>
      <SmallContainer width="100%" background="#f0f0f0" margin="5px">
        <Icon
          className="fas fa-trash-alt"
          float="right"
          marginRight="1rem"
          fontSize="1.2rem"
          marginTop=" 0.5rem"
          color="#333333"
          onClick={() => deleteNote(meeting, _id)}
        />
        <Title padding="0 0 0 2rem" color="#333333">
          {title}
        </Title>
        <Text padding="0 0 1rem 2rem" color="#333333">
          {description}{" "}
        </Text>
        <Divider height="2px" width="100%"></Divider>
      </SmallContainer>
    </>
  );
};

export default NoteItem;
