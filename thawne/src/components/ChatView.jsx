import React, { useState, useEffect } from 'react';

import MessageList from './ChatView/MessageList';
import MessageInput from './ChatView/MessageInput';
// import { getMessageList } from '../api/chatApi';
import useToken from '../hooks/useToken';
import API_CONFIG from '../config/api';




function ChatView({ selectedChat, chatList , currentChatInfo}) {
  const [messages, setMessages] = useState([]);
  const { token } = useToken();
  
  

  useEffect(() => {
    if (selectedChat) {

      const newMessages = {
        chatId: currentChatInfo.chat_id,
        userId: token,
        securityLevel: currentChatInfo.seclvl,
        pass: currentChatInfo.pass,
      };
      const getMessageList = async (currentChat) => {
        try {
          const response = await fetch(API_CONFIG.endpoints.getTopMessages, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentChat)
          }).then((response) => response.json());
          console.log(response);
          console.log(response)
          if (response.success){
            console.log(response.message)
            setMessages(response.message)
          }
          else if (!response.success){
            console.log(response)
            setMessages([])
          }
          else if (!response.ok) {
            throw new Error(`Failed to fetch message list: ${response.status}`);
          }
          else{
            console.log(response)
          }
        } catch (error) {
          console.error('Error fetching message list:', error.message);
          throw error;
    }}  

    getMessageList(newMessages);
      
    } else {
      setMessages([]);
    }
  }, [selectedChat]);




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
  console.log(messages)

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
            <MessageInput chatList={chatList} currentChatInfo={currentChatInfo}/>
          </div>
          
        </div>
      ) : (
        <p className="text-center text-gray-500">Select a chat to start messaging.</p>
      )}
    </div>
  );
}

export default ChatView;
