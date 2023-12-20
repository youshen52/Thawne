import React, { useState } from 'react';

import useToken from '../hooks/useToken';
import API_CONFIG from '../config/api';

import ChatList from '../components/ChatList';
import ChatView from '../components/ChatView';
import VerifyChatModal from '../components/modals/VerifyChatModal';


function ChatPage({ handleChatSelect, selectedChat }) {
  const [password, setPassword] = useState('');
  const[currentChatInfo, setcurrentChatInfo] = useState({})
  const [chatList, setChatList] = useState([]);
  const [verifyChatModalIndex, setVerifyChatModalIndex] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const { token } = useToken();

  const openVerifyChatModal = (index) => {
    setVerifyChatModalIndex(index);
  };

  const closeVerifyChatModal = () => {
    setVerifyChatModalIndex(null);
  };

  const handlePasswordSubmit = async (password) => {
    try {
      const response = await fetch(API_CONFIG.endpoints.verifyChatUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: token,
          cid: chatList[verifyChatModalIndex].chat_id,
          seclvl: 'Top Secret',
          pass: password,
        }),
      }).then((response) => response.json());
      console.log(response);


      if (response) {
        closeVerifyChatModal();
        const selectedChat = chatList[verifyChatModalIndex];
        handleChatSelect(selectedChat);
        setActiveChat(verifyChatModalIndex);
        setcurrentChatInfo({
          chat_id : chatList[verifyChatModalIndex].chat_id,
          userId: token,
          seclvl: "Top Secret",
          pass: password
        });

      } else {
        console.error('Incorrect password');
      }
    } catch (error) {
      console.error('Error processing password submission:', error);
    }
  };
  console.log(currentChatInfo);
  return (
    <>
      <div className="flex bg-zinc-800 h-full border-black">
        <div className="basis-2/6 overflow-auto">
          <ChatList
            handleChatSelect={handleChatSelect}
            openVerifyChatModal={openVerifyChatModal}
            setActiveChat={setActiveChat}
            activeChat={activeChat}
            chatList={chatList}
            setChatList={setChatList}
          />
        </div>
        <div className="container w-screen">
          <ChatView selectedChat={selectedChat} chatList={chatList} currentChatInfo={currentChatInfo} />
        </div>
      </div>

      {verifyChatModalIndex !== null && (
        <VerifyChatModal
          handlePasswordSubmit={handlePasswordSubmit}
          closeVerifyChatModal={closeVerifyChatModal}
        />
      )}
    </>
  );
}

export default ChatPage;