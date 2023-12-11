
import ChatList from './components/ChatList'
import ChatView from './components/ChatView'
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import CreateChat from './components/CreateChat';
import { Router } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  <BrowserRouter>
    <Routes>
          <Route path="/createChat" element={ <CreateChat />}/>
    </Routes>
  </BrowserRouter>

  const chats = [
    { name: 'Lewis', message: 'kukubird' },
    { name: 'You Shen', message: 'Bicep curls/shoulder press ftw' },
    { name: 'Snir', message: 'it is football, not soccer' },
    { name: 'Boon Ping', message: 'The glaze is real' },
    { name: 'You Shen', message: 'Bicep curls/shoulder press ftw' },
    { name: 'Snir', message: 'it is football, not soccer' },
    { name: 'Boon Ping', message: 'The glaze is real' },
    { name: 'You Shen', message: 'Bicep curls/shoulder press ftw' },
    { name: 'Snir', message: 'it is football, not soccer' },
    { name: 'Boon Ping', message: 'The glaze is real' },
    { name: 'You Shen', message: 'Bicep curls/shoulder press ftw' },
    { name: 'Snir', message: 'it is football, not soccer' },
    { name: 'Boon Ping', message: 'The glaze is real' }
  ];

  return (
    <>
      <NavBar/>
      <div className='flex bg-white'>
          <div className='basis-2/6 overflow-auto'>
            <SearchBar/>
            <ChatList chats={chats}/>
          </div>
          <div className='container w-full overflow-auto'>
            <ChatView/>
          </div>
      </div>
    </>

  );
}

export default App;
