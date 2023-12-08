import React, { useState } from "react";

function ChatList() {
  const chats = [
    { name: 'Lewis', message: 'kukubird' },
    { name: 'You Shen', message: 'Bicep curls/shoulder press ftw' },
    { name: 'Snir', message: 'it is football, not soccer' },
    { name: 'Boon Ping', message: 'The glaze is real' }
  ];

  const [activeChat, setActiveChat] = useState(null);

  const handleChatClick = (index) => {
    setActiveChat((prevActiveChat) => (prevActiveChat === index ? null : index));
  };

  return (
    <>
          <div className="border-r border-gray-300 lg:col-span-1">
            <div className="mx-3 my-3">
              <div className="relative text-gray-600">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
                <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                  placeholder="Search" required />
              </div>
            </div>

            <ul className="overflow-auto h-[32rem]">
              <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
              {chats.map((chat, index) => (
                <li key={index} onClick={() => handleChatClick(index)}>
                  <a
                    className={activeChat === index ? "flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none bg-gray-100" : "flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer focus:outline-none"}
                  >
                    <img className="object-cover w-10 h-10 rounded-full"
                      src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username" />
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
          </div>
    </>
  );
}

export default ChatList;