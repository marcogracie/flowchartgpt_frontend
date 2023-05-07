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
  Grid,
  Card,
  CardContent,
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
  //const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messages = [
    { sender: "user", content: "Hello, I need help with a flowchart." },
    {
      sender: "api",
      content: "Sure, I'd be happy to help. What do you need help with?",
    },
    { sender: "user", content: "Can you help me create a simple flowchart?" },
    { sender: "api", content: "Absolutely! Please provide some details." },
  ];

  
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
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
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
        <Grid container sx={{ flexGrow: 1, p: 2 }}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflowY: "auto",
                gap: 2,
              }}
            >
                {messages.map((message, index) => (
                <Card
                  key={index}
                  sx={{
                    alignSelf:
                      message.sender === "user" ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                    bgcolor:
                      message.sender === "user"
                        ? "primary.main"
                        : "secondary.main",
                    color:
                      message.sender === "user"
                        ? "common.white"
                        : "common.black",
                  }}
                >
                  <CardContent>
                    <Typography variant="body1">{message.content}</Typography>
                  </CardContent>
                </Card>
                ))}
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
          </Grid>
          <Grid item xs={12} md={9}></Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
