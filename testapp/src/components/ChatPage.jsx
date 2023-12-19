import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatView from './ChatView';
import useToken from './useToken';

const ChatPage = ({ handleChatSelect, selectedChat }) => {
  const [password, setPassword] = useState('');
  const [chatList, setChatList] = useState([]);
  const [passwordModalIndex, setPasswordModalIndex] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const { token } = useToken();

  const openPasswordModal = (index) => {
    setPasswordModalIndex(index);
  };

  const closePasswordModal = () => {
    setPasswordModalIndex(null);
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

      if (true) {
        closePasswordModal();
        const selectedChat = chatList[passwordModalIndex];
        handleChatSelect(selectedChat);
        setActiveChat(passwordModalIndex);
      } else {
        console.error('Incorrect password');
      }
    } catch (error) {
      console.error('Error processing password submission:', error);
    }
  };

  return (
    <>
      <div className="flex bg-white h-full">
        <div className="basis-2/6 overflow-auto">
          <ChatList
            handleChatSelect={handleChatSelect}
            openPasswordModal={openPasswordModal}
            setActiveChat={setActiveChat}
            activeChat={activeChat}
            chatList={chatList}
            setChatList={setChatList}
          />
        </div>
        <div className="container w-screen">
          <ChatView selectedChat={selectedChat} />
        </div>
      </div>

      {passwordModalIndex !== null && (
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
              <button onClick={closePasswordModal} className="bg-red-500 text-white px-4 py-2 rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPage;