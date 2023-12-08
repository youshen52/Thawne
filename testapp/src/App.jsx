
import ChatList from './components/ChatList'
import ChatView from './components/ChatView'

function App() {

  return (
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <ChatList/>
        <ChatView/>
      </div>


  );
}

export default App;
