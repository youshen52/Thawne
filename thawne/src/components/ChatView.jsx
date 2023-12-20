import React, { useState, useEffect } from 'react';

import MessageList from './ChatView/MessageList';
import MessageInput from './ChatView/MessageInput';



function ChatView({ selectedChat, chatList , currentChatInfo}) {
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

  const checkSecurity = (level) => {
    if(level == "Top Secret"){
      return <span className='ml-2 text-xs bg-red-600 text-white font-semibold p-1 rounded-md'>Top Secret</span>
    }
    else if(level == "Sensitive"){
      return <span className='ml-2 text-xs bg-yellow-600 text-white font-semibold p-1 rounded-md'>Sensitive</span>
    }
    else{
      return <span className='ml-2 text-xs bg-green-600 text-white font-semibold p-1 rounded-md'>Open</span>
    }
  }

  return (
    <div className="hidden lg:col-span-2 lg:block">
      {selectedChat ? (
        <div className="w-full h-3/4">
          <div className="relative flex items-center p-3 border-b border-black bg-zinc-800">
            <img className="object-cover w-10 h-10 rounded-full" src="/images/default_pfp.png" alt="username" />
            <span className="block ml-2 font-bold text-white">{selectedChat.chat_name}</span>
            <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            {checkSecurity(selectedChat.security_level)}
          </div>
          <MessageList messages={messages} />
          <div className='bg-zinc-800'>
            <MessageInput onSendMessage={handleSendMessage} chatList={chatList} currentChatInfo={currentChatInfo}/>
          </div>
          
        </div>
      ) : (
        <p className="text-center text-gray-500">Select a chat to start messaging.</p>
      )}
    </div>
  );
}

export default ChatView;
