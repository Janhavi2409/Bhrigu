import React from "react";
import {
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import "@fontsource/poppins";
import "@fontsource/habibi";
import ChatNavbar from "./ChatNavbar";
import ChatWindow from "./ChatWindow";


const ChatNow = () => {

  return (
      <Stack style={{ minHeight: "100vh", backgroundColor: "primary.main" }} direction={"column"}>
        <ChatNavbar/>
        <ChatWindow/>
      </Stack>
  );
};

export default ChatNow;
