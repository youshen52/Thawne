import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatView from './components/ChatView';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';

import CreateChat from './components/CreateChat';
import { Router } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

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
