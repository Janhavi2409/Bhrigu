import React from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Logo from "../Assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const address = "http://127.0.0.1:5000";
  // const address = "https://conversely-humorous-aphid.ngrok-free.app";
  const [errors, setErrors] = React.useState({
    username: false,
    password: false,
  });

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = async () => {
    setErrors({ username: false, password: false });
    let hasError = false;
    if (!username) {
        setErrors(prevErrors => ({ ...prevErrors, username: true }));
        hasError = true;
    }
    if (!password) {
        setErrors(prevErrors => ({ ...prevErrors, password: true }));
        hasError = true;
    }

    if (!hasError) {
        try {
            const response = await fetch('/login', {
            // const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('token', token);
                navigate('/chat');
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                setErrors({ username: true, password: true });
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }
  };

  return (
    <Stack sx={{ width: "100vw", height: "100vh" }}>
      <Toolbar
        sx={{
          height: "85px",
          justifyContent: "center",
          backgroundColor: "primary.main",
        }}
      >
        <Avatar alt="Logo" src={Logo} sx={{ width: 56, height: 56 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            mx: "20px",
            fontWeight: "bold",
            fontSize: "30px",
            color: "primary.light",
          }}
        >
          Bhrigu.ai
        </Typography>
      </Toolbar>
      <Box
        sx={{
          bgcolor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          padding: "0 20px",
        }}
      >
        <Paper
          elevation={24}
          sx={{
            height: 400,
            border: "black",
            width: 350,
            padding: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            boxShadow:
              "0px 11px 15px rgba(128, 128, 128, 0.3), 0px 24px 38px 3px rgba(128, 128, 128, 0.3), 0px 9px 46px 8px rgba(128, 128, 128, 0.3)",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "30px",
              color: "primary.light",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Login
          </Typography>
          <FormControl fullWidth error={errors.username} sx={{ mb: 2 }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="uname"
              name="uname"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              color="secondary"
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
                disableUnderline: false,
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
              }}
            />
            {errors.username && (
              <FormHelperText sx={{ color: "white" }}>
                Username is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth error={errors.password} sx={{ mb: 2 }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="pwd"
              name="pwd"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="standard"
              color="secondary"
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
                disableUnderline: false,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
              }}
            />
            {errors.password && (
              <FormHelperText sx={{ color: "white" }}>
                Password is required
              </FormHelperText>
            )}
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2, color: "white", borderColor: "white" }}
            onClick={handleRegisterClick}
          >
            Register
          </Button>
        </Paper>
      </Box>
    </Stack>
  );
};

export default Login;
