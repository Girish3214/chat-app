import React from "react";
import { useGlobalChatContext } from "../../store/chatContext";
import { Avatar } from "@mui/material";
import { useGlobalContext } from "../../store/authContext";

const PotentialChats = () => {
  const { user } = useGlobalContext();
  const { potentialChats, createChat } = useGlobalChatContext();
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((newUser, index) => (
            <div
              key={newUser._id + index}
              className="single-user"
              onClick={() => createChat(user?._id, newUser?._id)}
            >
              {newUser.avatar && (
                <Avatar sx={{ width: 56, height: 56 }}>
                  <img
                    src={newUser.avatar}
                    alt={newUser.name}
                    style={{ width: 56 }}
                  />
                </Avatar>
              )}
              <div className="potential-user-name">{newUser.name}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PotentialChats;
