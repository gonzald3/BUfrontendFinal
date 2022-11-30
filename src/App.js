import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom";
import { useState, useEffect } from 'react';
import Context from './context';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    initAuthUser();
    //initCometChat();
  }, []);


  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };




  return (
    <>
    <Context.Provider value={{user, setUser }}>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
    </Context.Provider>
      
    </>
  );
}

export default App;
