// import React from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   Paper,
//   Stack,
//   TextField,
//   Toolbar,
//   Typography,
//   FormControl,
//   FormHelperText,
// } from "@mui/material";
// import axios, { AxiosError } from 'axios';
// import Logo from "../Assets/Logo.png";
// import { useNavigate } from "react-router-dom";

// type CustomFormHelperTextProps = {
//   children: React.ReactNode;
// };

// const CustomFormHelperText: React.FC<CustomFormHelperTextProps> = ({
//   children,
//   ...props
// }) => (
//   <FormHelperText {...props} sx={{ color: "white !important" }}>
//     {children}
//   </FormHelperText>
// );

// const UserDetails = () => {
//   const navigate = useNavigate();

//   const [name, setName] = React.useState("");
//   const [dob, setDOB] = React.useState("");
//   const [time, setTime] = React.useState("");
//   const [place, setPlace] = React.useState("");
//   const [errors, setErrors] = React.useState({
//     name: false,
//     dob: false,
//     time: false,
//     place: false,
//   });

//   const isAxiosError = (error: any): error is AxiosError => {
//     return error.isAxiosError !== undefined;
//   };

//   const handleSaveClick = async () => {
//     setErrors({ name: false, dob: false, time: false, place: false });
//     let hasError = false;

//     // Validate form inputs
//     if (!name) {
//         setErrors(prevErrors => ({ ...prevErrors, name: true }));
//         hasError = true;
//     }
//     if (!dob) {
//         setErrors(prevErrors => ({ ...prevErrors, dob: true }));
//         hasError = true;
//     }
//     if (!time) {
//         setErrors(prevErrors => ({ ...prevErrors, time: true }));
//         hasError = true;
//     }
//     if (!place) {
//         setErrors(prevErrors => ({ ...prevErrors, place: true }));
//         hasError = true;
//     }

//     if (!hasError) {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.post(
//                 'http://localhost:5000/userdetails',
//                 { name, dob, time, place },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             console.log("User details saved:", response.data);
//             navigate("/");
//         } catch (error: unknown) {
//             if (axios.isAxiosError(error)) {
//                 // Type guard to check if error is an AxiosError
//                 console.error("There was an error saving the user details!", error.response?.data || error.message);
//             } else {
//                 // Handle non-Axios errors
//                 console.error("An unexpected error occurred:", error);
//             }
//         }
//     }
// };

//   return (
//     <Stack sx={{ width: "100vw", height: "100vh" }}>
//       <Toolbar
//         sx={{
//           height: "85px",
//           justifyContent: "center",
//           backgroundColor: "primary.main",
//         }}
//       >
//         <Avatar alt="Logo" src={Logo} sx={{ width: 56, height: 56 }} />
//         <Typography
//           variant="h6"
//           component="div"
//           sx={{
//             flexGrow: 1,
//             mx: "20px",
//             fontWeight: "bold",
//             fontSize: "30px",
//             color: "primary.light",
//           }}
//         >
//           Bhrigu.ai
//         </Typography>
//       </Toolbar>
//       <Box
//         sx={{
//           bgcolor: "primary.main",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexGrow: 1,
//           padding: "0 20px",
//         }}
//       >
//         <Paper
//           elevation={24}
//           sx={{
//             height: 500,
//             border: "black",
//             width: 350,
//             padding: "40px",
//             backgroundColor: "rgba(255, 255, 255, 0.4)",
//             boxShadow:
//               "0px 11px 15px rgba(128, 128, 128, 0.3), 0px 24px 38px 3px rgba(128, 128, 128, 0.3), 0px 9px 46px 8px rgba(128, 128, 128, 0.3)",
//           }}
//         >
//           <Typography
//             sx={{
//               fontWeight: "bold",
//               fontSize: "30px",
//               color: "primary.light",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             User Details
//           </Typography>
//           <FormControl fullWidth error={errors.name} sx={{ mb: 2 }}>
//             <TextField
//               autoFocus
//               required
//               margin="dense"
//               id="name"
//               name="name"
//               label="Enter Name"
//               type="text"
//               fullWidth
//               variant="standard"
//               color="secondary"
//               InputLabelProps={{
//                 style: { color: "white" },
//               }}
//               InputProps={{
//                 style: { color: "white" },
//                 disableUnderline: false,
//               }}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               sx={{
//                 "& .MuiInput-underline:before": {
//                   borderBottomColor: "white",
//                 },
//                 "& .MuiInput-underline:after": {
//                   borderBottomColor: "white",
//                 },
//                 "& .MuiInputLabel-root": {
//                   color: "white",
//                 },
//               }}
//             />
//             {errors.name && (
//               <CustomFormHelperText>Name is required</CustomFormHelperText>
//             )}
//           </FormControl>
//           <FormControl fullWidth error={errors.dob} sx={{ mb: 2 }}>
//             <TextField
//               autoFocus
//               required
//               margin="dense"
//               id="dob"
//               name="dob"
//               label="Enter Date Of Birth"
//               type="date"
//               fullWidth
//               variant="standard"
//               color="secondary"
//               InputLabelProps={{
//                 style: { color: "white" },
//                 shrink: true,
//               }}
//               InputProps={{
//                 style: { color: "white" },
//                 disableUnderline: false,
//               }}
//               value={dob}
//               onChange={(e) => setDOB(e.target.value)}
//               sx={{
//                 "& .MuiInput-underline:before": {
//                   borderBottomColor: "white",
//                 },
//                 "& .MuiInput-underline:after": {
//                   borderBottomColor: "white",
//                 },
//                 "& .MuiInputLabel-root": {
//                   color: "white",
//                 },
//               }}
//             />
//             {errors.dob && (
//               <CustomFormHelperText>
//                 Date Of Birth is required
//               </CustomFormHelperText>
//             )}
//           </FormControl>
//           <FormControl fullWidth error={errors.time} sx={{ mb: 2 }}>
//             <TextField
//               autoFocus
//               required
//               margin="dense"
//               id="time"
//               name="time"
//               label="Enter Time Of Birth"
//               type="time"
//               fullWidth
//               variant="standard"
//               color="secondary"
//               InputLabelProps={{
//                 style: { color: "white" },
//                 shrink: true,
//               }}
//               InputProps={{
//                 style: { color: "white" },
//                 disableUnderline: false,
//               }}
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               sx={{
//                 "& .MuiInput-underline:before": {
//                   borderBottomColor: "white",
//                 },
//                 "& .MuiInput-underline:after": {
//                   borderBottomColor: "white",
//                 },
//                 "& .MuiInputLabel-root": {
//                   color: "white",
//                 },
//               }}
//             />
//             {errors.time && (
//               <CustomFormHelperText>
//                 Time Of Birth is required
//               </CustomFormHelperText>
//             )}
//           </FormControl>
//           <FormControl fullWidth error={errors.place} sx={{ mb: 2 }}>
//             <TextField
//               autoFocus
//               required
//               margin="dense"
//               id="place"
//               name="place"
//               label="Enter Place Of Birth"
//               type="text"
//               fullWidth
//               variant="standard"
//               color="secondary"
//               InputLabelProps={{
//                 style: { color: "white" },
//               }}
//               InputProps={{
//                 style: { color: "white" },
//                 disableUnderline: false,
//               }}
//               value={place}
//               onChange={(e) => setPlace(e.target.value)}
//               sx={{
//                 "& .MuiInput-underline:before": {
//                   borderBottomColor: "white",
//                 },
//                 "& .MuiInput-underline:after": {
//                   borderBottomColor: "white",
//                 },
//                 "& .MuiInputLabel-root": {
//                   color: "white",
//                 },
//               }}
//             />
//             {errors.place && (
//               <CustomFormHelperText>
//                 Place Of Birth is required
//               </CustomFormHelperText>
//             )}
//           </FormControl>
//           <Button
//             variant="contained"
//             sx={{
//               width: "100%",
//               marginTop: 5,
//               bgcolor: "primary.light",
//               color: "#000000",
//               fontWeight: "bold",
//               fontSize: 15,
//               "&:hover": {
//                 bgcolor: "primary.main",
//                 color: "primary.light",
//               },
//               "&:active": {
//                 bgcolor: "primary.main",
//                 color: "primary.light",
//               },
//             }}
//             onClick={handleSaveClick}
//           >
//             Save
//           </Button>
//         </Paper>
//       </Box>
//     </Stack>
//   );
// };

// export default UserDetails;

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
} from "@mui/material";
import axios from 'axios';
import Logo from "../Assets/Logo.png";
import { useNavigate } from "react-router-dom";

// Define the error type for form fields
interface FormErrors {
  name: boolean;
  dob: boolean;
  time: boolean;
  place: boolean;
}

// Custom helper text component for form errors
type CustomFormHelperTextProps = {
  children: React.ReactNode;
};

const CustomFormHelperText: React.FC<CustomFormHelperTextProps> = ({
  children,
  ...props
}) => (
  <FormHelperText {...props} sx={{ color: "white !important" }}>
    {children}
  </FormHelperText>
);

const UserDetails = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [dob, setDOB] = React.useState("");
  const [time, setTime] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [errors, setErrors] = React.useState<FormErrors>({
    name: false,
    dob: false,
    time: false,
    place: false,
  });

  // Function to handle form submission
  const handleSaveClick = async () => {
    setErrors({ name: false, dob: false, time: false, place: false });
    let hasError = false;

    // Validate form inputs
    if (!name) {
        setErrors(prevErrors => ({ ...prevErrors, name: true }));
        hasError = true;
    }
    if (!dob) {
        setErrors(prevErrors => ({ ...prevErrors, dob: true }));
        hasError = true;
    }
    if (!time) {
        setErrors(prevErrors => ({ ...prevErrors, time: true }));
        hasError = true;
    }
    if (!place) {
        setErrors(prevErrors => ({ ...prevErrors, place: true }));
        hasError = true;
    }

    if (!hasError) {
        try {
          const response = await axios.post(
            'http://localhost:5000/userdetails',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, dob, time, place })
        });
            console.log("User details saved:", response.data);
            navigate("/chat");
        } catch (error) {
            console.error("There was an error saving the user details!", error);
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
            User Details
          </Typography>
          <FormControl fullWidth error={errors.name} sx={{ mb: 2 }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Enter Name"
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            {errors.name && (
              <CustomFormHelperText>Name is required</CustomFormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth error={errors.dob} sx={{ mb: 2 }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="dob"
              name="dob"
              label="Enter Date Of Birth"
              type="date"
              fullWidth
              variant="standard"
              color="secondary"
              InputLabelProps={{
                style: { color: "white" },
                shrink: true,
              }}
              InputProps={{
                style: { color: "white" },
                disableUnderline: false,
              }}
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
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
            {errors.dob && (
              <CustomFormHelperText>
                Date Of Birth is required
              </CustomFormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth error={errors.time} sx={{ mb: 2 }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="time"
              name="time"
              label="Enter Time Of Birth"
              type="time"
              fullWidth
              variant="standard"
              color="secondary"
              InputLabelProps={{
                style: { color: "white" },
                shrink: true,
              }}
              InputProps={{
                style: { color: "white" },
                disableUnderline: false,
              }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
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
            {errors.time && (
              <CustomFormHelperText>
                Time Of Birth is required
              </CustomFormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth error={errors.place} sx={{ mb: 2 }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="place"
              name="place"
              label="Enter Place Of Birth"
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
              value={place}
              onChange={(e) => setPlace(e.target.value)}
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
            {errors.place && (
              <CustomFormHelperText>
                Place Of Birth is required
              </CustomFormHelperText>
            )}
          </FormControl>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              marginTop: 5,
              bgcolor: "primary.light",
              color: "#000000",
              fontWeight: "bold",
              fontSize: 15,
              "&:hover": {
                bgcolor: "primary.main",
                color: "primary.light",
              },
              "&:active": {
                bgcolor: "primary.main",
                color: "primary.light",
              },
            }}
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </Paper>
      </Box>
    </Stack>
  );
};

export default UserDetails;
