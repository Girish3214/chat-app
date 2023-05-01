import React from "react";
import { useGlobalChatContext } from "../../store/chatContext";
import { Container, Hidden, Stack } from "@mui/material";
import UserChat from "../../components/chats/UserChat";
import { useGlobalContext } from "../../store/authContext";
import homeStyles from "../../assets/homeStyles";

const HomePage = () => {
  const { userChats, isChatLoading, userChatsError } = useGlobalChatContext();
  const { user } = useGlobalContext();

  if (userChats?.length < 1) {
    return;
  }
  return (
    <Container>
      <Stack direction={"row"} spacing={4} sx={homeStyles.containerHeight}>
        <Stack spacing={3}>
          {isChatLoading && <p>Loading...</p>}
          {userChats?.map((chat, index) => (
            <div key={chat._id + index}>
              <UserChat chat={chat} user={user} />
            </div>
          ))}
        </Stack>
        <Hidden smDown>
          <h1>chat</h1>
        </Hidden>
      </Stack>
    </Container>
  );
};

export default HomePage;
