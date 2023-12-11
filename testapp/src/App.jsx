import React, { useState } from 'react';
import ChatPage from './components/ChatPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import CreateChat from './components/CreateChat';


function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [token, setToken] = useState();



  if(!token) {
    return <Login setToken={setToken} />
  }


  return (
    <>
        <div className="wrapper">
      <h1>Application</h1>
      <Router>
        <Routes>
        <Route path="/chats" element={<ChatPage handleChatSelect={handleChatSelect} selectedChat={selectedChat} />} />
        </Routes>
      </Router>
    </div>

    </>
  );
}

export default App;
