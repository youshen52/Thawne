import React, { useState , useEffect} from 'react';



function ChatList({ onChatSelect }) {

  const [chatList, setChatList] = useState([''])

  async function reflectAllChats(userId) {
    const response = await fetch('http://localhost:5000/getallchat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userId)
    })
      .then((response) => response.json());
      setChatList(response)
  }

  const userId = '6cc260f0'
  useEffect(() =>{
    reflectAllChats(userId);
  }, [])
  
  const [activeChat, setActiveChat] = useState(null);

  const handleChatClick = (index) => {
    const selectedChat = chatList[index];
    onChatSelect(selectedChat);
    setActiveChat((prevActiveChat) => (prevActiveChat === index ? null : index));
  };

  const checkSecurity = (level) => {
    if(level == "Top Secret"){
      return (
        <div>
          <span className='text-xs bg-red-600 text-white font-semibold p-1 rounded-md'>Top Secret</span>
          <span className='text-gray-800'><ion-icon name="lock-closed"></ion-icon></span>
        </div>
      )

    }
    else if(level == "Sensitive"){
      return <span className='text-xs bg-yellow-600 text-white font-semibold p-1 rounded-md'>Sensitive</span>
    }
    else{
      return <span className='text-xs bg-green-600 text-white font-semibold p-1 rounded-md'>Open</span>
    }
  }

  console.log(chatList)



  return (
    <>
      
      <div className="h-[47rem]">
        <h2 className="my-2 mb-4 ml-2 text-lg text-gray-600 font-semibold">Chats</h2>
        {chatList.map((chat, index) => (
          <div
            className={`rounded-xl cursor-pointer transition duration-300 ease-in-out ${
              activeChat === index ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
            key={index} // Use the index as a key
            onClick={() => handleChatClick(index)}
          >
            <div className="flex items-center px-4 py-3">
              <img
                className="object-cover w-12 h-12 rounded-full mr-4"
                src="./public/images/default_pfp.png"
                alt="username"
              />
              
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{chat.chat_name}</span>
                  {checkSecurity(chat.security_level)}
                </div>
                <span className="text-sm text-gray-600">{}</span>
              </div>
            </div>
          </div>
        ))}
      </div> 
    </>
  );
}

export default ChatList;
