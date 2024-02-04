import { useState, createContext } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

export const Context = createContext<any>(undefined);

interface User {
  avatar: string,
  name: string,
  id: number,
  login: string,
}

function App() {
  const [auth, setAuth] = useState<boolean>(false);
  const [myUser, setMyUser] = useState<User>()

  return (
    <Context.Provider value={{ auth, setAuth, myUser, setMyUser }}>
      <div className='MainApp'>
        {auth ? <Home /> : <Login />}
      </div>
    </Context.Provider>
  );
}

export default App;
