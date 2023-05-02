import React from "react";
import { useGlobalChatContext } from "../../store/chatContext";
import { useGlobalContext } from "../../store/authContext";
import useFetchReceiverUser from "../../hooks/useFetchReceiverUser";
import { Stack } from "@mui/material";
import moment from "moment";

const ChatBox = () => {
  const { user } = useGlobalContext();
  const { currentChat, messages, isMessageLoading } = useGlobalChatContext();

  const { receivedUser } = useFetchReceiverUser(currentChat, user);

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
    </Stack>
  );
};

export default ChatBox;
