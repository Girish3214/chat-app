import React from "react";
import useFetchReceiverUser from "../../hooks/useFetchReceiverUser";
import { Avatar, Stack } from "@mui/material";
import homeStyles from "../../assets/homeStyles";
import "../../assets/chats.css";

const UserChatsContainer = ({ chat, user }) => {
  const { receivedUser } = useFetchReceiverUser(chat, user);
  return (
    <Stack direction={"row"} spacing={3} className="user-card">
      <div className="flex">
        <div>
          <Avatar sx={{ marginRight: 1.5 }}>
            <img src={receivedUser?.avatar} alt="avatar" />
          </Avatar>
        </div>
        <div className="text-content">
          <div className="name">{receivedUser?.name}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="date-container">
        <div className="date">15/04/1999</div>
        <div className="user-notifications">2</div>
      </div>
    </Stack>
  );
};

export default UserChatsContainer;
