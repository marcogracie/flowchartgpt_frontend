import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
  TextField,
  IconButton,
  Grid
} from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SendIcon from "@mui/icons-material/Send";

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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const sendMessage = () => {
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
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
        <Box
          sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}
        >
          <Paper
            variant="outlined"
            sx={{
              flexGrow: 1,
              p: 2,
              overflowY: "scroll",
              "&: :-webkit-scrollbar": {
                width: "0.4em",
              },
              "&: :-webkit-scrollbar-thumb": {
                borderRadius: "4px",
                backgroundColor: theme.palette.grey[500],
              },
            }}
          >
            <List>
              {messages.map((message, index) => (
                <ListItem key={index}>
                  <ListItemText primary={message} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mt: 2,
            }}
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton
              type="submit"
              color="primary"
              disabled={!input.trim()}
              sx={{ m1: 1 }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
