import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function ChatView() {

  const [messages, setMessages] = useState([
    { text: 'Hi', sender: 'other' },
    { text: 'Hello', sender: 'user' },
  ]);

  const handleSendMessage = (messageText) => {
    const newMessage = { text: messageText, sender: 'user' };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="hidden lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="relative flex items-center p-3 border-b border-gray-300">
          <img className="object-cover w-10 h-10 rounded-full" src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
          <span className="block ml-2 font-bold text-gray-600">Emma</span>
          <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
        </div>
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatView;
