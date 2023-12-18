import React from 'react';
import SearchBar from './SearchBar';
import ChatList from './ChatList';
import ChatView from './ChatView';


const ChatPage = ({ handleChatSelect, selectedChat }, userId) => {
  return (
    <>
      <div className="flex bg-white h-full">
        <div className="basis-2/6 overflow-auto">
          <ChatList onChatSelect={handleChatSelect} userId={userId}/>
        </div>
        <div className="container w-screen">
          <ChatView selectedChat={selectedChat} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
