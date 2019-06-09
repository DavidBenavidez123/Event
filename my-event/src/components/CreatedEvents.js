import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreatedEventsCard from './CreatedEventsCard';

class CreatedEvents extends Component {
  state = {
    events: []
  };

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
        const user = res.data.users[0].users_id;
        this.getEvents(user);
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  getEvents(user) {
    let data = {
      id: user
    };
    axios
      .post('http://localhost:3300/userEvent', data)
      .then(res => {
        console.log(res.data);
        this.setState({ events: res.data.event });
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  render() {
    console.log(this.state.userId);
    return (
      <div className="eventDisplay">
        {this.state.events.map(event => (
          <div className="eventCardDisplay">
            <CreatedEventsCard events={event} />
          </div>
        ))}
      </div>
    );
  }
}

export default CreatedEvents;
