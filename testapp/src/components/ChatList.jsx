import React, { useState } from 'react';
import SearchBar from './SearchBar';

function ChatList({ onChatSelect }) {
  const chats = [
        { name: 'Lewis', message: 'kukubird' },
    { name: 'You Shen', message: 'Bicep curls/shoulder press ftw' },
    { name: 'Snir', message: 'it is football, not soccer' },
    { name: 'Boon Ping', message: 'The glaze is real' },
    { name: 'You Shen', message: 'Bicep curls/shoulder press ftw' },
    { name: 'Snir', message: 'it is football, not soccer' },
    { name: 'Boon Ping', message: 'The glaze is real' },
    { name: 'You Shen', message: 'Bicep curls/shoulder press ftw' },
    { name: 'Snir', message: 'it is football, not soccer' },
    { name: 'Boon Ping', message: 'The glaze is real' },
    { name: 'You Shen', message: 'Bicep curls/shoulder press ftw' },
    { name: 'Snir', message: 'it is football, not soccer' },
    { name: 'Boon Ping', message: 'The glaze is real' }
  ];

  const [activeChat, setActiveChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChatClick = (index) => {
    const selectedChat = chats[index];
    onChatSelect(selectedChat);
    setActiveChat((prevActiveChat) => (prevActiveChat === index ? null : index));
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="overflow-auto h-[47rem]">
        <h2 className="my-2 mb-4 ml-2 text-lg text-gray-600 font-semibold">Chats ({filteredChats.length})</h2>
        <SearchBar onSearch={setSearchTerm} />
        {filteredChats.map((chat, index) => (
          <div
            className={`rounded-xl cursor-pointer transition duration-300 ease-in-out ${
              activeChat === index ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
            key={index}
            onClick={() => handleChatClick(index)}
          >
            <div className="flex items-center px-4 py-3">
              <img
                className="object-cover w-12 h-12 rounded-full mr-4"
                src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                alt="username"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{chat.name}</span>
                  <span className="text-sm text-gray-600">25 minutes</span>
                </div>
                <span className="text-sm text-gray-600">{chat.message}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChatList;
