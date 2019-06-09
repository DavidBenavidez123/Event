import React, { Component } from 'react';
import Drawer from './components/Drawer';
import Login from './components/Login';
import Register from './components/Register';
import { Route } from 'react-router-dom';
import Events from './components/Events';
import SingleEvent from './components/SingleEvent';
import CreateEvent from './components/CreateEvent';
import PurchaseHistory from './components/PurchaseHistory';
import CreatedEvents from './components/CreatedEvents';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    const token = localStorage.getItem('jwt');
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get('http://localhost:3300/getUserData', options)
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data.users[0] });
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  render() {
    return (
      <div className="App">
        <Drawer user={this.state.user} />
        <div className="content">
          <Route exact path="/" render={props => <Events {...props} />} />
          <Route path="/Login" render={props => <Login {...props} />} />

          <Route
            path="/event/:id"
            render={props => <SingleEvent {...props} user={this.state.user} />}
          />
          <Route
            path="/createevent"
            render={props => <CreateEvent {...props} user={this.state.user} />}
          />
          <Route
            path="/PurchaseHistory"
            render={props => (
              <PurchaseHistory {...props} user={this.state.user} />
            )}
          />
          <Route
            path="/CreatedEvents"
            render={props => (
              <CreatedEvents {...props} user={this.state.user} />
            )}
          />

          <Route path="/Register" render={props => <Register {...props} />} />
        </div>
      </div>
    );
  }
}

export default App;
