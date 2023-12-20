import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { submitMessage } from '../../api/chatApi';


function MessageInput({ onSendMessage, currentChatInfo}) {

  
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'];

  const messageSchema = Yup.object({
    chatId: Yup.mixed().required('Required'),
    userId: Yup.string().required('Required'),
    securityLevel: Yup.string().required('Required'),
    chatPassword: Yup.string().required('Required'),
    message: Yup.string().required(),
    file: Yup.mixed(),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

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
    <Formik
      initialValues={{
        chatId: currentChatInfo.chatId,
        userId: currentChatInfo.token,
        securityLevel: currentChatInfo.seclvl,
        chatPassword: currentChatInfo.password,
        message: '',
        file: '',
      }}
      validationSchema={messageSchema}
      onSubmit={(values) => {
        console.log(values);
        handleSendMessage(values);
        handleSubmit(values);
        submitMessage(values);
      }}
    >
      {({formik, errors, touched}) => (
        <Form onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
          <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
            <button
              className="bg-gray-800 text-2xl px-2 py-1 mr-1 text-white"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <ion-icon name="happy-outline"></ion-icon>
            </button>
            {showEmojiPicker && (
              <EmojiPicker onEmojiClick={handleEmojiClick} autoFocusSearch />
            )}
            <Field
              type="file"
              id="file"
              name="file"
              className="hidden"
            />
            <label
              htmlFor="file"
              className="bg-gray-800 text-2xl px-2 py-1 rounded-md cursor-pointer text-white"
            >
              <ion-icon name="attach-outline"></ion-icon>
            </label>
            <Field
              type="text"
              placeholder="Message"
              value={messageText}
              onChange={handleInputChange}
              className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
              name="message"
            />
            <button
              type="submit"
              className="text-gray-800 bg-transparent text-2xl px-2 py-1"
            >
              <ion-icon name="send"></ion-icon>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default MessageInput;
