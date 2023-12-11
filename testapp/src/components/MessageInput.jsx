import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

function MessageInput({ onSendMessage }) {
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  const handleEmojiClick = (emojiData) => {
    setMessageText((prevMessage) => prevMessage + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <form onSubmit={handleSendMessage}>
      <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
        <button
          className="bg-gray-800 text-2xl px-2 py-1 mr-1"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <ion-icon name="happy-outline"></ion-icon>
        </button>
        {showEmojiPicker && (
          <EmojiPicker onEmojiClick={handleEmojiClick} autoFocusSearch />
        )}
        <button className="bg-gray-800 text-2xl px-2 py-1">
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
        <button type="submit" className="text-gray-800 bg-transparent text-2xl px-2 py-1">
          <ion-icon name="send"></ion-icon>
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
