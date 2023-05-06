import React, { useEffect, useRef, useState } from "react";
import { Avatar, IconButton, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import InputEmoji from "react-input-emoji";

import { useGlobalChatContext } from "../../store/chatContext";
import { useGlobalContext } from "../../store/authContext";
import useFetchReceiverUser from "../../hooks/useFetchReceiverUser";

const ChatBox = () => {
  const { user } = useGlobalContext();
  const {
    currentChat,
    messages,
    isMessageLoading,
    sendTextMessage,
    onlineUser,
    deleteChat,
  } = useGlobalChatContext();

  const { receivedUser } = useFetchReceiverUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const messagesEndRef = useRef();

  const isOnline = onlineUser.some((user) => user.userId === receivedUser?._id);

  const handleOnEnter = () => {
    sendTextMessage(textMessage, user, currentChat, setTextMessage);
    // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
    return () => {};
  }, [messages]);

  useEffect(() => {
    return () => {
      if (currentChat?._id && (messages?.length === 0 || messages === null)) {
        deleteChat();
      }
    };
  }, [currentChat]);

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
        <div>
          <Avatar sx={{ marginRight: 1.5 }}>
            <img src={receivedUser?.avatar} alt="avatar" />
          </Avatar>
        </div>
        <div className="flex">
          <strong>{receivedUser?.name}</strong>
          {isOnline ? <p>online</p> : <p>offline...</p>}
        </div>
      </div>
      <Stack spacing={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={message.text + index}
              className={`${
                message?.senderId === user?._id ? "message self" : "message"
              }`}
              ref={messagesEndRef}
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
