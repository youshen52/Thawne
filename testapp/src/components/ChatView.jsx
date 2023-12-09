import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function ChatView({ selectedChat }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
      const newMessages = [
        { text: 'Hi', sender: 'other' },
      ];
      setMessages(newMessages);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  const handleSendMessage = (messageText) => {
    const newMessage = { text: messageText, sender: 'user' };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="hidden lg:col-span-2 lg:block">
      {selectedChat ? (
        <div className="w-full">
          <div className="relative flex items-center p-3 border-b border-gray-300">
            <img className="object-cover w-10 h-10 rounded-full" src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
            <span className="block ml-2 font-bold text-gray-600">{selectedChat.name}</span>
            <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
          </div>
          <MessageList messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <p className="text-center text-gray-500">Select a chat to start messaging.</p>
      )}
    </div>
  );
}

export default ChatView;
