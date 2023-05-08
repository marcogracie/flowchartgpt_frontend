import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  SvgIcon,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";

const CustomToggle = styled("div")({
    display: "flex",
    alignItems: "center",
    width: 53,
    height: 34,
    borderRadius: 17,
    backgroundColor: "currentColor",
    padding: "0 4px",
    position: "relative",
    cursor: "pointer",
  });
  
  const CustomThumb = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 29,
    height: 29,
    borderRadius: "50%",
    backgroundColor: "white",
    boxShadow: "none",
    position: "absolute",
  });
  
  function DarkModeToggle({ darkMode, toggleDarkMode }) {
    const theme = useTheme();
  
    const ThumbIcon = darkMode ? NightsStayIcon : WbSunnyIcon;
    const thumbPosition = darkMode ? "calc(100% - 28px)" : "2px";
    const iconColor = darkMode ? "black" : "inherit";
  
    return (
      <CustomToggle
        onClick={toggleDarkMode}
        style={{ color: theme.palette.primary.light }}
      >
        <CustomThumb style={{ left: thumbPosition }}>
          <SvgIcon component={ThumbIcon} style={{ color: iconColor }} />
        </CustomThumb>
      </CustomToggle>
    );
  }

const TopBar = ({ darkMode, toggleDarkMode }) => (
  <AppBar position="static" sx={{ borderRadius: "0px 0px 25px 25px" }}>
    <Toolbar>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, textAlign: "center" }}
      >
        FlowChart GPT
      </Typography>
      <DarkModeToggle
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </Toolbar>
  </AppBar>
);

export default TopBar;
