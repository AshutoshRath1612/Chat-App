import React from 'react';
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<Chat />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/setavatar' element={<SetAvatar />}></Route>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
