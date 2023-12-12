import React, { useState } from 'react';

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

  const handleChatClick = (index) => {
    const selectedChat = chats[index];
    onChatSelect(selectedChat);
    setActiveChat((prevActiveChat) => (prevActiveChat === index ? null : index));
  };

  return (
    <>
      <ul className="overflow-auto h-[47rem]">
        <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats ({chats.length})</h2>
        {chats.map((chat, index) => (
          <li key={index} onClick={() => handleChatClick(index)}>
            <a
              className={
                activeChat === index
                  ? 'flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer focus:outline-none bg-gray-300'
                  : 'flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-200 focus:outline-none'
              }
            >
              <img className="object-cover w-10 h-10 rounded-full" src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username" />
              <div className="w-full pb-2">
                <div className="flex justify-between">
                  <span className="block ml-2 font-semibold text-gray-600">{chat.name}</span>
                  <span className="block ml-2 text-sm text-gray-600">25 minutes</span>
                </div>
                <span className="block ml-2 text-sm text-gray-600">{chat.message}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ChatList;