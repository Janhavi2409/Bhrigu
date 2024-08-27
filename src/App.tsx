import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import ChatNow from "./Components/ChatNow";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UserDetails from "./Components/UserDetails";

const theme = createTheme({
  palette: {
    background: {
      default: "#131314",
    },
    primary: {
      main: "#131314",
      light: "#FFFFFF",
    },
    secondary: {
      main: "#393F44",
    },
  },
  typography: {
    fontFamily: "poppins, habibi",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatNow />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userdetails" element={<UserDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
