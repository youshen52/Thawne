import React, { useState } from 'react';
import ChatPage from './components/ChatPage';
import SettingsPage from './components/SettingsPage';
import Settings from './components/Settings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import NavBarModal from './components/NavBarModal';
import useToken from './components/useToken';


function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const { token, setToken } = useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  

  if(!token) {
    return <Login setToken={setToken} />
  }


  return (
    <>
      <div className="wrapper flex-1">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavBar openModal={openModal} />
                  <ChatPage
                    handleChatSelect={handleChatSelect}
                    selectedChat={selectedChat}
                  />
                  {isModalOpen && <NavBarModal closeModal={closeModal} />}
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <NavBar openModal={openModal} />
                  <Settings/>
                  {isModalOpen && <NavBarModal closeModal={closeModal} />}
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
