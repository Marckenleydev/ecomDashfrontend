import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../store/store";
import FlexBetween from "./FlexBetween"; // Assuming you meant FlexBetween

import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { userAPI } from "../service/UserService";
import {useNavigate } from "react-router-dom";
import { Key } from "./enum/cache.key";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(menuAnchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [logoutUser] = userAPI.useLogoutUserMutation();
  const { data: user, error, isLoading, refetch } = userAPI.useFetchUserProfileQuery();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose =  () => {
    setMenuAnchorEl(null);
  logoutUser();
  
      setTimeout(() => {

        localStorage.setItem(Key.LOGGEDIN, "false");
        navigate(`/login`)
      }, 1000);


  };

  // const handleLogout = () => {

  // }



  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right side */}
        <FlexBetween gap="1.5rem">
        <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined />
            ) : (
              <DarkModeOutlined />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            <Button onClick={handleClick}>
              <Box
                component="img"
                alt="profile"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              {isLoading ? (
                 <Typography
                 ml="1rem"
                
                 fontSize="0.85rem"
                 sx={{ color: theme.palette.secondary[100] }}
               >Profile Loading...   </Typography>
              ) : (
                <Box textAlign="left" ml="1rem">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user?.data.user.name}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user?.data.user.occupation}
                  </Typography>
                </Box>
              )}
              
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={menuAnchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
