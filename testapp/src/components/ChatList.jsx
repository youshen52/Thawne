import React, { useState, useEffect } from 'react';
import useToken from './useToken';

import SearchBar from './SearchBar';

function ChatList({ onChatSelect }) {
  const [chatList, setChatList] = useState(['']);
  const { token } = useToken();

  const [activeChat, setActiveChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState('');

  const reflectAllChats = async (userId) => {
    const response = await fetch('http://localhost:5000/getallchat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId),
    }).then((response) => response.json());
    setChatList(response);
  };

  useEffect(() => {
    reflectAllChats(token);
  }, [token]);

  const handleChatClick = async (index, securityLevel) => {
    if (securityLevel === 'Top Secret') {
      setModalOpen(true);
    } else {
      const selectedChat = chatList[index];
      onChatSelect(selectedChat);
      setActiveChat((prevActiveChat) => (prevActiveChat === index ? null : index));
    }
  };

  const checkSecurity = (level) => {
    if (level === 'Top Secret') {
      return (
        <div>
          <span className='text-xs bg-red-600 text-white font-semibold p-1 rounded-md'>Top Secret</span>
          <span className='text-gray-800'><ion-icon name="lock-closed"></ion-icon></span>
        </div>
      );
    } else if (level === 'Sensitive') {
      return <span className='text-xs bg-yellow-600 text-white font-semibold p-1 rounded-md'>Sensitive</span>;
    } else {
      return <span className='text-xs bg-green-600 text-white font-semibold p-1 rounded-md'>Open</span>;
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/verifychatuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: token,
          cid: 'chatid',
          seclvl: 'Sensitive',
          pass: password,
        }),
      }).then((response) => response.json());

      if (response.success) {
        setModalOpen(false);
        const selectedChat = chatList[activeChat];
        onChatSelect(selectedChat);
        setActiveChat(null);
      } else {
        console.error('Incorrect password');
      }
    } catch (error) {
      console.error('Error processing password submission:', error);
    }
  };

  return (
    <>
      <div className="h-[47rem]">
        <h2 className="my-2 mb-4 ml-2 text-lg text-gray-600 font-semibold">Chats</h2>
        {chatList.map((chat, index) => (
          <div
            className={`rounded-xl cursor-pointer transition duration-300 ease-in-out ${
              activeChat === index ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
            key={index}
            onClick={() => handleChatClick(index, chat.security_level)}
          >
            <div className="flex items-center px-4 py-3">
              <img
                className="object-cover w-12 h-12 rounded-full mr-4"
                src="./public/images/default_pfp.png"
                alt="username"
              />

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{chat.chat_name}</span>
                  {checkSecurity(chat.security_level)}
                </div>
                <span className="text-sm text-gray-600">{}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-6 rounded-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Enter Password</h2>
      <label className='text-gray-700 mb-2'>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-2 rounded-md mb-4"
      />
      <div className="flex justify-between">
        <button onClick={handlePasswordSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
        <button onClick={() => setModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
}

export default ChatList;
