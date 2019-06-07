import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventsCard from './EventsCard';

class Events extends Component {
  state = {
    events: []
  };
  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    axios
      .get('http://localhost:3300/events')
      .then(res => {
        console.log(res.data);
        this.setState({ events: res.data.events });
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  render() {
    return (
      <div className="eventDisplay">
        {this.state.events.map(event => (
          <div className='eventCardDisplay'>
            <EventsCard events={event} />
          </div>
        ))}
      </div>
    );
  }
}

export default Events;
