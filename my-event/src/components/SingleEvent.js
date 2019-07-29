import React, { Component } from 'react';

import axios from 'axios';

class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      ticket: 1,
      price: 0,
      purchaseError: ''
    };
  }



  componentDidMount() {
    this.getEvent();
  }

  userEventCheck() {
    if (this.props.user.users_id != this.state.event.users_id) {
      return (
        <div>
          <form>
            Amount of tickets
            <input
              type="number"
              id="tentacles"
              name="tentacles"
              min="1"
              max="100"
              value={this.state.ticket}
              name="ticket"
              onChange={this.handleChange}
            />
          </form>
          <h3 onClick={this.purchaseTicket}>Purchase</h3>
          <h2>{this.state.confirmation || this.state.purchaseError}</h2>
        </div>
      );
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  purchaseTicket = e => {
    if (!this.props.user.users_id) {
      this.setState({
        purchaseError: 'Login First'
      });
    } else {
      e.preventDefault();
      const Price = this.state.event.price * this.state.ticket;
      let Purchase = {
        price: Price,
        users_id: this.props.user.users_id,
        event_id: this.state.event.event_id,
        tickets: this.state.ticket
      };
      axios
        .post('http://localhost:3300/makePurchase', Purchase)
        .then(res => {
          this.setState({
            confirmation: 'Thank you for purchase!'
          });
        })
        .catch(err => {
          console.log('Purchase failed');
        });
    }
  };

  getEvent() {
    axios
      .get(`http://localhost:3300/event/${this.props.match.params.id}`)
      .then(res => {
        console.log('single event', res.data);
        this.setState({ event: res.data.event[0] });
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  render() {
    console.log('single event id', this.state.user_id);
    return (
      <div className="purchase-flex">
        <div className="singleEventDisplay">
          <h1>{this.state.event.event_name}</h1>
          <h2>Organizer: {this.state.event.organizer_name}</h2>
          <img
            src={this.state.event.img_url}
            alt={this.state.event.event_name}
          />
          <h2>Location: {this.state.event.event_location}</h2>
          <p>
            {' '}
            Date:{' '}
            {` ${this.state.event.start_date}  - ${
              this.state.event.end_date
            }  `}
          </p>
          <p>
            Time:
            {` ${this.state.event.start_time}  - ${
              this.state.event.end_time
            }  `}
          </p>
          <h2>Ticket Price: ${this.state.event.price}</h2>

          <h2>Description</h2>
          <p>{this.state.event.text}</p>
        </div>
        {this.userEventCheck()}
        <div />
      </div>
    );
  }
}

// end_date: "interview14223"
// end_time: "interview1235623"
// event_id: 1
// event_location: "PACIFIC DESIGN CENTER"
// event_name: "MTS DESIGN TALK "
// img_url: "https://mts-development.s3.amazonaws.com/MTS-eventImage-fq7z8yjn-1559783154285"
// last_updated: "2019-06-07 03:08:23"
// organizer_name: "MTS"
// start_date: "12/10/17"
// start_time: "3:30 PM"
// text: "interview1234"

export default SingleEvent;
