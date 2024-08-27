import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Box,
  CssBaseline,
  Paper,
  Stack,
  InputBase,
  IconButton,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Logo from "../Assets/Logo.png";
import User from "../Assets/User.png";

const ChatWindow: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai', text: string }[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSend = async () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: inputText }]);

      setInputText('');

      const aiResponse = await fetchAIResponse(inputText);

      setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: aiResponse }]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSend();
  };

  const fetchAIResponse = async (userInput: string) => {
  try {
    const response = await fetch('https://conversely-humorous-aphid.ngrok-free.app/api/bhrigu/invoke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { question: userInput }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const data = await response.json();
    return data.output || 'No response from AI';
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Error fetching AI response';
  }
};


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Stack direction={'row'}>
          <Stack sx={{ margin: '30px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '96.8vw',
                height: '80vh',
                borderRadius: 5,
                p: 2,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  mb: 2,
                  borderRadius: 1,
                  p: 2,
                }}
              >
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      alignItems: 'center', 
                      mb: 1,
                    }}
                  >
                    {message.sender === 'ai' && (
                      <img src={Logo} alt="AI" style={{ width: 40, height: 40, marginRight: 8 }} />
                    )}
                    <Box
                      sx={{
                        maxWidth: '70%',
                        bgcolor: "secondary.main",
                        color: '#FFFFFF',
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      <Typography>{message.text}</Typography>
                    </Box>
                    {message.sender === 'user' && (
                      <img src={User} alt="User" style={{ width: 40, height: 40, marginLeft: 8 }} />
                    )}
                  </Box>
                ))}
              </Box>
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: '100%',
                  bgcolor: '#1E1F20',
                }}
                onSubmit={handleSubmit}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, color: '#FFFFFF' }}
                  placeholder="Ask me something..."
                  inputProps={{ 'aria-label': 'ask me something...' }}
                  value={inputText}
                  onChange={handleInputChange}
                />
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="Send"
                  onClick={handleSend}
                >
                  <SendIcon sx={{ color: '#FFFFFF' }} />
                </IconButton>
              </Paper>
            </Box>
          </Stack>
          <Stack sx={{ justifyContent: 'center' }}>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default ChatWindow;
