import React, { useEffect, useState } from "react";
import { Avatar, Box, Container, Paper, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";

const sprites = [
  "male",
  "female",
  "human",
  "bottts",
  "avataaars",
  "gridy",
  "micah",
  "adventurer",
  "adventurer-neutral",
  "avataaars-neutral",
];
const SetAvatar = () => {
  //   const avatarApi = "https://api.multiavatar.com/45678945";
  const avatarApi = "https://avatars.dicebear.com/api";
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [selectAvatars, setSelectedAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAvatars = async () => {
    let data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${avatarApi}/${sprites[Math.floor(Math.random() * 9) + 1]}/girish.svg`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
      console.log(data);
    }
    setAvatars(data);
    setIsLoading(false);
  };
  const setProfile = async () => {};

  useEffect(() => {
    getAvatars();
    return () => {};
  }, []);

  return (
    <Container component="main" maxWidth="sm" sx={{ paddingTop: "4rem" }}>
      <Paper
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
        }}
        elevation={5}
      >
        <Avatar
          sx={{
            bgcolor: "transparent",
            color: "white",
            width: 56,
            height: 56,
            margin: 1,
          }}
        >
          <AccountCircleIcon sx={{ width: 56, height: 56 }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Select Avatar
        </Typography>

        <Box component="main" noValidate sx={{ mt: 1 }} className="avatars">
          {avatars.map((avatar, index) => (
            <div
              key={avatar + index}
              className={`avatar ${selectAvatars === index ? "selected" : ""}`}
            >
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                onClick={() => setSelectedAvatars(index)}
              />
            </div>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default SetAvatar;
