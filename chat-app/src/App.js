import React from 'react';
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<Chat />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
