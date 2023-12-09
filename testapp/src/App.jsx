import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatView from './components/ChatView';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';

function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <>
      <NavBar />
      <div className="flex bg-white h-full">
        <div className="basis-2/6 overflow-auto">
          <SearchBar />
          <ChatList onChatSelect={handleChatSelect} />
        </div>
        <div className="container w-screen overflow-auto">
          <ChatView selectedChat={selectedChat} />
        </div>
      </div>
    </>
  );
}

export default App;
