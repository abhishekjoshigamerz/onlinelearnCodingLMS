import React, { useState, useEffect } from 'react';
import  './AIChatBot.css';
const { Configuration, OpenAIApi } = require("openai");
const parse = require('html-react-parser');
const AIChatBot = ({setAIChatBotTextArea, description}) => {
  const [messages, setMessages] = useState([
    { text: 'Hi, I am your AI Chatbot. How can I help you?', sender: 'AI' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const fetchChatGPTResponse = async (input) => {
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_AI_KEY,
    });
    
    const openai = new OpenAIApi(configuration);

    let msg = `Reject user request if they are asking for code or asking you to write the program. Give them a hint but don't give them code at any cost. If they abuse warn them with account suspension.\n 
    ${description}\n check if input is relate to this description above if above answer that question 
    if not answer the input only but if not related to programming reject there request  saying not related to programming. 
    ${input}`;
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: msg }],
    });
    console.log(chatCompletion.data.choices[0].message.content);
    // return chatCompletion.data.choices[0].message;
    return chatCompletion.data.choices[0].message.content;
  }

  const sendMessage = async (e) => {
    e.preventDefault();

    // Add user message to chat
    setMessages([...messages, { text: input, sender: 'User' }]);
    setInput('');
    setTyping(true);
    // Send input to AI service to get response
    const aiResponse = await fetchChatGPTResponse(input); // Replace with your AI service function
    // const aiResponse = 'This is a response from the AI service'; // Replace with your AI service function
    // Add AI response to chat

    let i = 0;
    let tempMsg = '';

    const typingInterval = setInterval(() => {
      if (i < aiResponse.length) {
        tempMsg = tempMsg + aiResponse.charAt(i);
        setMessages(prev => {
          const temp = [...prev];
          temp[temp.length - 1] = { text: tempMsg, sender: 'AI' };
          return temp;
        });
        setTyping(false);
        i++;
      } else {
        clearInterval(typingInterval);
        setTyping(false);
      }
    }, 50);



    // setMessages([...messages, { text: aiResponse, sender: 'AI' }]);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    
};

  const handleClose = (e) => {
    e.preventDefault();
    setAIChatBotTextArea(false);
    setMessages([]);

  };

  return (
    <div className="ai-chatbot">
      <div className="chat-window">
        {messages.map((message, i) => (
          <p key={i}>
            <strong>{message.sender}:</strong> {parse((message.text || '').replace(/\n/g, '<br />'))}
          </p>
        ))}
        {typing && <p><strong>AI:</strong> typing...</p>}
      </div>
      <form className="chat-input" onSubmit={sendMessage}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button type="close" onClick={handleClose}>Close</button>
        <button type="submit">Send</button>
      </form>
    </div>

  );
};

export default AIChatBot;
