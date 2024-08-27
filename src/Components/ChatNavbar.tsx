import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Toolbar,
  Avatar,
  Typography,
  IconButton,
  Popover,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import Logo from "../Assets/Logo.png";
import User from "../Assets/User.png"

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const menu: MenuItem[] = [
  {
    title: "Profile",
    icon: <AccountCircleIcon sx={{color:"#FFFFFF"}} />,
    link: "/",
  },
  {
    title: "Settings",
    icon: <SettingsIcon sx={{color:"#FFFFFF"}} />,
    link: "/",
  },
  {
    title: "Logout",
    icon: <LogoutIcon sx={{color:"#FFFFFF"}} />,
    link: "/",
  },
];

const ChatNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = React.useState<MenuItem | null>(
    null
  );
  const [open, setOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (value: MenuItem) => {
    setSelectedValue(value);
    setAnchorEl(null);
    if (value.title === "Profile") {
      setOpen(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack>
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
            color: "#FFFFFF",
          }}
        >
          Bhrigu.ai
        </Typography>
        <IconButton onClick={handleClick}>
          <Avatar alt="User" src={User} />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Paper sx={{ width: "150px", bgcolor:"secondary.main", color:"#FFFFFF" }}>
            <List>
              {menu.map((menuItem) => (
                <ListItem disableGutters key={menuItem.title}>
                  <ListItemButton onClick={() => handleListItemClick(menuItem)}>
                    <ListItemIcon >
                      {menuItem.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography textAlign={"left"}>
                          {menuItem.title}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Popover>
      </Toolbar>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(
              (formData as any).entries()
            );
            const details = {
              name: formJson.name,
              dob: formJson.dob,
              time: formJson.time,
              place: formJson.place,
            };
            console.log(details);
            handleClose();
          },
        }}
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            color="secondary"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="dob"
            name="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="standard"
            color="secondary"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="time"
            name="time"
            label="Time of Birth"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="standard"
            color="secondary"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="place"
            name="place"
            label="Place of Birth"
            type="text"
            fullWidth
            variant="standard"
            color="secondary"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography color={"secondary.main"}>Cancel</Typography>
          </Button>
          <Button type="submit">
            <Typography color={"secondary.main"}>Update</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default ChatNavbar;
