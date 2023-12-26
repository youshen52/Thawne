import React from 'react';
import useToken from '../../hooks/useToken';
import extractFirstKey from '../../helpers/extractFirstKey';

function MessageList({ messages }) {

  const { token } = useToken();
  const checkMessageList = (messages) => {
    if (messages.length == 0){
      return <p className='text-white text-center'>Chat does not have any messages yet.</p>
    }
    else{
      return null
    }
  }

  const userMessage = (senderId) => {
    if (senderId === token){
      return true
    }
    else{
      return false
    }
  }

  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem] " style={{ 
      backgroundImage: `url("/images/chatWallpaper.jpg")`
    }}>
      {checkMessageList(messages)}
      <ul className="space-y-2">
        {messages.map((message, index) => (
          <li key={index} className={`flex justify-${userMessage(extractFirstKey(message.sent_from)) ? 'end' : 'start'}`}>
            <div className={`relative max-w-xl px-4 py-2 text-white bg-gray-700  ${userMessage(extractFirstKey(message.sent_from)) ? 'bg-gray-100 rounded' : 'rounded shadow'}`}>
              {userMessage(extractFirstKey(message.sent_from)) ? <span className="block">{message.content}</span> : <span className="block">{message.content}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
