import React, { useState, useEffect } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import app from './Firebase';


const ChatBox = ({ onSendMessage }) => {
  const [input, setInput] = useState("");
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user); // Update the user state

        // Path to the user's document in Firestore
        const userDocRef = doc(db, "users", user.uid);

        // Try to get the user's document from Firestore
        const userDoc = await getDoc(userDocRef);

        // If the user's document doesn't exist, create it
        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            uid: user.uid,
            createdAt: new Date().toISOString(), // Current date and time
            // Add any other default fields for new users here...
          });
        }

        const messagesRef = collection(db, `users/${user.uid}/messages`);
        onSnapshot(messagesRef, (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(messages);
        });
      } else {
        setUser(null); // Update the user state when the user is signed out
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, db]);

  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        id: uuidv4(),
        content: input,
        sender: "user", // assuming this is the user's message
        timestamp: new Date().toISOString(), // current date and time
        userId: user.uid,
      };

      onSendMessage(message);
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
