import React, { useState } from "react";
import {
  Box,
  Paper,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";

const ChatBox = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState("");
  const theme = useTheme();

  const sendMessage = () => {
    if (input.trim()){
        onSendMessage(input);
        setInput("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          height: "calc(100vh - 210px)", 
          maxHeight: "calc(100vh - 210px)",
          p: 2,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "4px",
            backgroundColor: theme.palette.grey[500],
          },
        }}
      >
        <Box>
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  message.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Card
                sx={{
                  maxWidth: "80%",
                  borderRadius:
                    message.sender === "user"
                      ? "30px 30px 0px 30px"
                      : "30px 30px 30px 0px",
                  bgcolor:
                    message.sender === "user"
                      ? "primary.main"
                      : "secondary.main",
                  color:
                    message.sender === "user" ? "common.white" : "common.black",
                  mb: 1,
                }}
              >
                <CardContent>
                  <Typography variant="body1">{message.content}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
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
  );
};

export default ChatBox;
