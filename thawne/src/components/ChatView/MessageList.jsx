import React from 'react';
import useToken from '../../hooks/useToken';

function MessageList({ messages }) {

  const { token } = useToken();
  const checkMessageList = (messages) => {
    if (messages.length == 0){
      return <p className='text-white text-center'>Chat does not have any messages yet.</p>
    }
    else{
      null
    }
  }

  const userMessage = (senderId) => {
    if (senderId === token){
      return true
    }
    else{
      false
    }
  }

  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem] " style={{ 
      backgroundImage: `url("/images/chatWallpaper.jpg")`
    }}>
      {checkMessageList(messages)}
      <ul className="space-y-2">
        {messages.map((message, index) => (
          <li key={index} className={`flex justify-${userMessage(Object.keys(message.sent_from)[0]) ? 'end' : 'start'}`}>
            <div className={`relative max-w-xl px-4 py-2 text-white bg-gray-700  ${userMessage(Object.keys(message.sent_from)[0]) ? 'bg-gray-100 rounded' : 'rounded shadow'}`}>
              {userMessage(Object.keys(message.sent_from)[0]) ? <span className="block">{message.content}</span> : <span className="block">{message.content}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
