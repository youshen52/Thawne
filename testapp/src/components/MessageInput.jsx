import React, { useState } from 'react';


function MessageInput({ onSendMessage }) {
    const [messageText, setMessageText] = useState('');

    const handleInputChange = (e) => {
        setMessageText(e.target.value);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (messageText.trim() !== '') {
            onSendMessage(messageText);
            setMessageText('');
        }
    };

  return (
    <form onSubmit={handleSendMessage}>
    <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
      <button className='bg-gray-800 text-2xl px-2 py-1 mr-1'>
        <ion-icon name="happy-outline"></ion-icon>
      </button>
      <button className='bg-gray-800 text-2xl px-2 py-1'>
        <ion-icon name="attach-outline"></ion-icon>
      </button>
      <input
          type="text"
          placeholder="Message"
          value={messageText}
          onChange={handleInputChange}
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          name="message"
          required
        />
      <button type="submit" className='text-gray-800 bg-transparent text-2xl px-2 py-1'>
        <ion-icon name="send"></ion-icon>
      </button>
    </div>
    </form>
  );
}

export default MessageInput;