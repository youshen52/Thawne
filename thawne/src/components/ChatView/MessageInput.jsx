import React, { useState,  useEffect, useRef} from 'react';
import EmojiPicker from 'emoji-picker-react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { submitMessage } from '../../api/chatApi';
import PreviewImage from './PreviewImage';


function MessageInput({currentChatInfo}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sensitiveDataList, setSensitiveDataList] = useState(null);


  const initialValues = {
    message: '',
    file: null,
  };

  const messageSchema = Yup.object({
    message: Yup.string().required('Message is required'),
    file: Yup.mixed(),
  });



  const handleSendMessage = (values, { resetForm }) => {
    if (values.message.trim() !== '') {
      const editedvalues = {
        chatId: currentChatInfo.chat_id,
        userId: currentChatInfo.userId,
        securityLevel: currentChatInfo.seclvl,
        chatPassword: currentChatInfo.pass,
        ...values,
      };
      console.log(editedvalues);
      if (sensitiveDataList.length > 0) {
        setShowModal(true); // Display modal if sensitive data is detected
      } else {
        submitMessage(editedvalues);
        resetForm();
      }
    }
  };


  const handleEmojiClick = (emojiData) => {
    setFieldValue('message', messageText + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const sensitiveData = [
    /^[SFTG]\d{7}[A-Z]$/, // NRIC
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/, // IPv4
    /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/, // Mastercard
    /\b([4]\d{3}[\s]\d{4}[\s]\d{4}[\s]\d{4}|[4]\d{3}[-]\d{4}[-]\d{4}[-]\d{4}|[4]\d{3}[.]\d{4}[.]\d{4}[.]\d{4}|[4]\d{3}\d{4}\d{4}\d{4})\b/, // Visa
    /^3[47][0-9]{13}$/, // Amex
    /\b[\w.-]{0,25}@(yahoo|hotmail|gmail)\.com\b/ // Email
  ];

  const textScanning = (text) =>{
      const sensitiveList = [];
      const words = text.split(/\s+/); // Split the text into words
      for (let word of words) {
          for (let pattern of sensitiveData) {
              const match = pattern.test(word);
              if (match) {
                  sensitiveList.push(word);
                  setShowModal(true);
                  console.log('Matched:', sensitiveList);
              }
          }
      }
      if (sensitiveList.length > 0) {
        setSensitiveDataList(sensitiveList); 
      }
  }
  // const fileRef = useRef();

  // const onSelectFile = (event) => {
  //   const selectedFile = event.target.files;;
  //   console.log(selectedFile)
  // }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={messageSchema}
      onSubmit={handleSendMessage}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className="flex items-center justify-between w-full p-3 border-t border-black">
            <button
              type="button"
              className="bg-transparent text-2xl px-2 py-1 mr-1 text-white"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <ion-icon name="happy-outline"></ion-icon>
            </button>
            {showEmojiPicker && (
              <EmojiPicker onEmojiClick={handleEmojiClick} autoFocusSearch />
            )}
            {/* <input type="file" id="file" name="file" ref={fileRef} onChange={onSelectFile} multiple accept='image/png . image/jpeg . image/webp' className='hidden' /> */}
            {/* <label
              htmlFor="file"
              className="bg-transparent text-2xl px-2 py-1 rounded-md cursor-pointer text-white"
            >
              <ion-icon name="attach-outline"></ion-icon>
            </label> */}
            {/* {values.file && <PreviewImage file={values.file} />} */}
            {/* <button type='button' onClick={() => {fileRef.current.click();}} className="bg-transparent text-2xl px-2 py-1 rounded-md cursor-pointer text-white">
              <ion-icon name="attach-outline"></ion-icon>
            </button> */}
            <Field type="file" id="file" name="file" className="hidden" />
            <label
              htmlFor="file"
              className="bg-transparent text-2xl px-2 py-1 rounded-md cursor-pointer text-white"
            >
              <ion-icon name="attach-outline"></ion-icon>
            </label>
            <Field
              type="text"
              placeholder="Message"
              className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
              name="message"
              onChange={(e) => {
                setFieldValue('message', e.target.value);
              }}
            />
            <button type="submit" onClick={(e) => textScanning(e.currentTarget.form.elements.message.value)} className="text-white bg-transparent text-2xl px-2 py-1">
              <ion-icon name="send"></ion-icon>
            </button>
          </div>
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-md">
                <h2>Sensitive Data detected!</h2>
                {sensitiveDataList.length > 0 ? (
                  <div>
                    <p>The following sensitive data was found:</p>
                    <ul>
                      {sensitiveDataList.map((data, index) => (
                        <li key={index} className='italic'>{data}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No sensitive data detected.</p>
                )}

                <p className='font-bold mt-4'>
                  You're attempting to send a message with sensitive data. Do you want to proceed?
                </p>
                <div className="flex justify-evenly mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setSensitiveDataList([]); 
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      submitMessage(values);
                      setShowModal(false);
                      setSensitiveDataList([]); 
                  
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default MessageInput;