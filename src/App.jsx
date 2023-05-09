import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import TopBar from "./TopBar";
import ChatBox from "./ChatBox";
import MermaidComponent from "./MermaidComponent";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chart, setChart] = useState(`graph TD
  Start --> A[Look for keys]
  A -->|Found| B[Go to car]
  A -->|Not found| C[Look in bag]
  C --> D{In bag?}
  D -->|Yes| B
  D -->|No| E[Look in kitchen]
  E --> F{In kitchen?}
  F -->|Yes| B
  F -->|No| G[Look in bedroom]
  G --> H{In bedroom?}
  H -->|Yes| B
  H -->|No| I[Look in bathroom]
  I --> J{In bathroom?}
  J -->|Yes| B
  J -->|No| K[Give up and take bus]
  K --> End
  B --> StartCar{Start car}
  StartCar -->|Successful| Drive[Drive to work]
  StartCar -->|Not successful| CallMechanic[Call mechanic]
  Drive --> Work[Arrive at work]
  Work -->|Day over| Home[Go home]
  Home --> Relax[Relax and prepare for the next day]
  Relax --> Sleep
  Sleep --> Start
`);

  const addMesssage = (newMessage) => {
    setMessages([...messages, { sender: "user", content: newMessage }]);
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
          maxHeight: "100vh",  // Set a maximum height
          bgcolor: (theme) => theme.palette.background.default,
          overflow: "hidden",  // Prevent overflow
        }}
      >
        {" "}
        <TopBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Grid
          container
          sx={{
            height: "calc(100vh - 56px)", p: 2, overflow: "hidden"
          }}
        >
          <Grid item xs={12} md={3}>
            <ChatBox messages={messages} onSendMessage={addMesssage} />
          </Grid>
          <Grid item xs={12} md={9} sx={{ height: '100%', overflow: 'auto' }}>
            <MermaidComponent chart={chart} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
