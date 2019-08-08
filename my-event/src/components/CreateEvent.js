import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ImageUploader from 'react-images-upload';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
    
  }
});

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pictures: '',
      event_name: '',
      users_id: '',
      img_url: '',
      text: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      event_location: '',
      organizer_name: '',
      price: '',
      users_id: this.props.user.users_id
    };
  }

  //   user_id, event_name, img_url, text, start_date, end_date,start_time,end_time,event_location,organizer_name

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:3300/addEvent', this.state)
      .then(res => {
        console.log(res.data);
        return axios.get('http://localhost:3300/events');
      })
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log('Error', err);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="createEvent">
        <form className={classes.container} noValidate autoComplete="off">
          <div className="create">
            <TextField
              error={this.state.nameTextFieldError}
              id="standard-name"
              label="Event name"
              className={classes.textField}
              value={this.state.event_name}
              onChange={this.handleChange}
              margin="normal"
              name="event_name"
            />
            <TextField
              error={this.state.emailTextFieldError}
              id="standard-name"
              label="Organizer Name"
              className={classes.textField}
              value={this.state.organizer_name}
              name="organizer_name"
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              error={this.state.nameTextFieldError}
              id="standard-name"
              label="Image"
              className={classes.textField}
              value={this.state.img_url}
              onChange={this.handleChange}
              margin="normal"
              name="img_url"
            />
            <TextField
              error={this.state.emailTextFieldError}
              id="standard-multiline-flexible"
              multiline
              rowsMax="4"
              label="Description"
              className={classes.textField}
              value={this.state.text}
              name="text"
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              error={this.state.nameTextFieldError}
              id="standard-name"
              label="Start Date DD/MM/YY"
              className={classes.textField}
              value={this.state.start_date}
              onChange={this.handleChange}
              margin="normal"
              name="start_date"
            />
            <TextField
              error={this.state.emailTextFieldError}
              id="standard-name"
              label="End Date DD/MM/YY"
              className={classes.textField}
              value={this.state.end_date}
              name="end_date"
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              error={this.state.nameTextFieldError}
              id="standard-name"
              label="Start Time 00:00 PM/AM"
              className={classes.textField}
              value={this.state.start_time}
              onChange={this.handleChange}
              margin="normal"
              name="start_time"
            />
            <TextField
              error={this.state.emailTextFieldError}
              id="standard-name"
              label="End Time 00:00 PM/AM"
              className={classes.textField}
              value={this.state.end_time}
              name="end_time"
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              error={this.state.nameTextFieldError}
              id="standard-name"
              label="Event Location"
              className={classes.textField}
              value={this.state.event_location}
              onChange={this.handleChange}
              margin="normal"
              name="event_location"
            />
            <TextField
              error={this.state.nameTextFieldError}
              id="standard-name"
              label="Price"
              className={classes.textField}
              value={this.state.price}
              onChange={this.handleChange}
              margin="normal"
              name="price"
            />
            {this.state.pictures}
            <Button
              onClick={this.formSubmit}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Create Event
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

CreateEvent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateEvent);
