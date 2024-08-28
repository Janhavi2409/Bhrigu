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

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  // const address = "http://127.0.0.1:5000";
  // const address = "https://conversely-humorous-aphid.ngrok-free.app";
  const [errors, setErrors] = React.useState({
    username: false,
    password: false,
    phone: false,
  });
  const [errorMessages, setErrorMessages] = React.useState({
    username: "",
    password: "",
    phone: "",
  });

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = async () => {
    setErrors({ username: false, password: false, phone: false });
    setErrorMessages({ username: "", password: "", phone: "" });

    let hasError = false;

    if (!username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: true }));
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        username: "Username is required",
      }));
      hasError = true;
    }

    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        password: "Password is required",
      }));
      hasError = true;
    }

    if (!phone) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: true }));
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        phone: "Phone number is required",
      }));
      hasError = true;

    }
    if (!hasError) {
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, phone }),
        });

        if (response.ok) {
          navigate('/login');
        } else {
          const errorData = await response.json();
          console.error('Registration failed:', errorData);

          if (errorData.error === "Username or phone number already exists") {
            setErrors({
              username: true,
              password: false,
              phone: true,
            });
            setErrorMessages({
              username: "Username or phone number already exists",
              password: "",
              phone: "Username or phone number already exists",
            });
          }
        }
      } catch (error) {
        console.error('Error registering:', error);
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
            height: 500,
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
            Register
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
                {errorMessages.username}
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
                {errorMessages.password}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth error={errors.phone} sx={{ mb: 2 }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="phone"
              name="phone"
              label="Phone Number"
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            {errors.phone && (
              <FormHelperText sx={{ color: "white" }}>
                {errorMessages.phone}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleRegisterClick}
          >
            Register
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2, color: "white", borderColor: "white" }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </Stack>
  );
};

export default Register;
