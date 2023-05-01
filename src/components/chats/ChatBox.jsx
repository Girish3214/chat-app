import React from "react";
import { useGlobalChatContext } from "../../store/chatContext";
import { useGlobalContext } from "../../store/authContext";
import useFetchReceiverUser from "../../hooks/useFetchReceiverUser";

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

  return <div>ChatBox</div>;
};

export default ChatBox;
