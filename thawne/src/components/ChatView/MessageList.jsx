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

  const getTimeStamp = (date, utcOffset) => {
    const time = new Date(date);
    
    const adjustedTime = new Date(time.getTime() + (utcOffset * 60 * 60 * 1000));
  
    let hour = adjustedTime.getHours() % 12;
    if (hour === 0) {
      hour = 12;
    }
  
    const minute = ("0" + adjustedTime.getMinutes()).slice(-2);
    const amPm = adjustedTime.getHours() >= 12 ? 'pm' : 'am';
    const completeTime = hour + ':' + minute + ' ' + amPm;
  
    return completeTime;
  };

  const getDateStamp = (date) => {

  }

  console.log(messages)

  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem] " style={{ 
      backgroundImage: `url("/images/chatWallpaper.jpg")`
    }}>
      {checkMessageList(messages)}
      <ul className="space-y-2">
        {[...messages].reverse().map((message, index) => (
          <li key={index} className={`flex justify-${userMessage(extractFirstKey(message.sent_from)) ? 'end' : 'start'}`}>
            <div className={`relative max-w-xl px-4 py-2 text-white ${userMessage(extractFirstKey(message.sent_from)) ? 'rounded bg-teal-800' : 'rounded shadow bg-gray-700'}`}>
              {userMessage(extractFirstKey(message.sent_from)) ? null : <p className='text-xs font-semibold italic'>{Object.values(message.sent_from)}</p>}
              <div className='flex justify-between'>
                {userMessage(extractFirstKey(message.sent_from)) ? <span className="block">{message.content}</span> : <span className="block">{message.content}</span>}
                <span className='text-xs mt-2 ml-4'>{getTimeStamp(message.date, 8)}</span>
              </div>
              
            </div>
            <p></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
