import React from 'react';
import Drawer from './components/Drawer';
import Login from './components/Login';
import Register from './components/Register';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import Events from './components/Events';

function App() {
  return (
    <div className="App">
      <Drawer />
      <div className="content">
        <Route exact path="/Events" component={Events} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
      </div>
    </div>
  );
}

export default App;
