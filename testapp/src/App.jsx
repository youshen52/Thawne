
import ChatList from './components/ChatList'
import ChatView from './components/ChatView'
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
function App() {

  return (
    <>
    <NavBar/>
    <div className='flex bg-white h-full'>
        <div className='basis-2/6 overflow-auto'>
          <SearchBar/>
          <ChatList/>
        </div>
        <div className='container w-full overflow-auto'>
          <ChatView/>
        </div>
    </div>
    </>

  );
}

export default App;
