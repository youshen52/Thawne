import React, { useState } from 'react';

import useToken from '../hooks/useToken';
import API_CONFIG from '../config/api';

import ChatList from '../components/ChatList';
import ChatView from '../components/ChatView';
import VerifyChatModal from '../components/VerifyChatModal';


function ChatPage({ handleChatSelect, selectedChat }) {
  const [password, setPassword] = useState('');
  const[currentChatInfo, setcurrentChatInfo] = useState(null)
  const [chatList, setChatList] = useState([]);
  const [VerifyChatModalIndex, setVerifyChatModalIndex] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const { token } = useToken();

  const openVerifyChatModal = (index) => {
    setVerifyChatModalIndex(index);
  };

  const closeVerifyChatModal = () => {
    setVerifyChatModalIndex(null);
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await fetch(API_CONFIG.endpoints.verifyChatUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: token,
          cid: chatList[VerifyChatModalIndex].chat_id,
          seclvl: 'Top Secret',
          pass: password,
        }),
      }).then((response) => response.json());
      console.log(response);


      if (response.success) {
        closeVerifyChatModal();
        const selectedChat = chatList[VerifyChatModalIndex];
        handleChatSelect(selectedChat);
        setActiveChat(VerifyChatModalIndex);
        setcurrentChatInfo({
          chat_id : chatList[VerifyChatModalIndex].chat_id,
          userId: token,
          seclvl: "Top Secret",
          pass: password
        })
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

      {VerifyChatModalIndex !== null && (
        <VerifyChatModal
          password={password}
          setPassword={setPassword}
          handlePasswordSubmit={handlePasswordSubmit}
          closeVerifyChatModal={closeVerifyChatModal}
        />
      )}
    </>
  );
}

export default ChatPage;