import React from 'react';


function MessageList({ messages }) {

  const checkMessageList = (messages) => {
    if (messages.length == 0){
      return <p className='text-white text-center'>Chat does not have any messages yet.</p>
    }
    else{
      null
    }
  }
  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem] " style={{ 
      backgroundImage: `url("/images/chatWallpaper.jpg")`
    }}>
      {checkMessageList(messages)}
      <ul className="space-y-2">
        {messages.map((message, index) => (
          <li key={index} className={`flex justify-${message.sender === 'user' ? 'end' : 'start'}`}>
            <div className={`relative max-w-xl px-4 py-2 text-white bg-gray-700  ${message.sender === 'user' ? 'bg-gray-100 rounded' : 'rounded shadow'}`}>
              <span className="block">{message.content}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
