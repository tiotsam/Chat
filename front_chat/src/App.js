import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Logged from './components/Logged';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import ReadUser from './components/ReadUser';
import Register from './components/Register';
import Room from './components/Room';
import RoomMessages from './components/RoomMessages';
import Auth from './contexts/auth';
import { hasLogged } from './services/Log';


function App() {
  
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div>
      <Auth.Provider value={{isLogged , setIsLogged}}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/room" component={Room}></Route>
            <Route exact path="/user" component={ReadUser}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/logged" component={Logged}></Route>
            <Route exact path="/logout" component={Logout}></Route>
            <Route exact path="/chatroom" component={RoomMessages}></Route>
          </Switch>
        </BrowserRouter>
      </Auth.Provider>
    </div>
  );
}

export default App;
