import React, { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import InputEmoji from "react-input-emoji";

import { useGlobalChatContext } from "../../store/chatContext";
import { useGlobalContext } from "../../store/authContext";
import useFetchReceiverUser from "../../hooks/useFetchReceiverUser";

const ChatBox = () => {
  const { user } = useGlobalContext();
  const { currentChat, messages, isMessageLoading, sendTextMessage } =
    useGlobalChatContext();

  const { receivedUser } = useFetchReceiverUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  const handleOnEnter = () => {
    console.log(textMessage);
    sendTextMessage(textMessage, user, currentChat, setTextMessage);
  };

  if (!receivedUser) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet
      </p>
    );
  }

  if (isMessageLoading) {
    return <p style={{ textAlign: "center", width: "100%" }}>loading...</p>;
  }

  return (
    <Stack spacing={4} className="chat-box">
      <div className="chat-header">
        <strong>{receivedUser?.name}</strong>
      </div>
      <Stack spacing={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={message.text + index}
              className={`${
                message?.senderId === user?._id ? "message self" : "message"
              }`}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
      <Stack
        spacing={3}
        direction={"row"}
        className="chat-input"
        alignItems={"center"}
      >
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
        <IconButton className="send-btn" onClick={handleOnEnter}>
          <SendIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
