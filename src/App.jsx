import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import TopBar from "./TopBar";
import ChatBox from "./ChatBox";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);

  const addMesssage = (newMessage) => {
    setMessages([...messages, {sender: "user", content: newMessage}]);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        {" "}
        <TopBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Grid container sx={{ height: "calc(100vh - 56px)", p: 2 }}>
          <Grid item xs={12} md={3}>
            <ChatBox messages={messages} onSendMessage={addMesssage} />
          </Grid>
          {/* ... */}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
