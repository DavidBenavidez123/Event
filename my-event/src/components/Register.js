import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginBottom:50,
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

class Register extends Component {
  state = {
    username: '',
    nameError: 'Name',
    email: '',
    emailError: 'Email',
    password: '',
    passwordError: 'Password',
    buttonText: 'Sign Up',
    emailTextFieldError: false,
    nameTextFieldError: false,
    passwordTextFieldError: false
  };

  formSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.setState({
        buttonText: '...signing up'
      });
      let data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };
      e.preventDefault();
        axios
            .post('http://localhost:3300/api/register', data)
            .then(res => {
              this.setState({ sent: true, buttonText: 'Sign Up Complete , Please Login' });
            })
            .catch(err => {
                console.log('Error', err)
            })

      // clear form
      this.setState({
        username: '',
        nameError: 'Name',
        email: '',
        emailError: 'Email',
        password: '',
        passwordError: 'Password',
        emailTextFieldError: false,
        nameTextFieldError: false,
        passwordTextFieldError: false
      });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validate = () => {
    let isError = false;
    if (!this.state.username.length) {
      isError = true;
      this.setState({
        nameError: 'Cannot be empty',
        nameTextFieldError: true
      });
    } else {
      this.setState({
        nameError: 'Name',
        nameTextFieldError: false
      });
    }
    if (!this.state.password.length) {
      isError = true;
      this.setState({
        passwordError: 'Cannot be empty',
        passwordTextFieldError: true
      });
    } else {
      this.setState({
        passwordError: 'Password',
        passwordTextFieldError: false
      });
    }
    if (this.state.email.indexOf('@') === -1) {
      isError = true;
      this.setState({
        emailError: 'This is not an email',
        emailTextFieldError: true
      });
    } else {
      this.setState({
        emailError: 'Email',
        emailTextFieldError: false
      });
    }
    return isError;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="RegisterPage">
        <form className={classes.container} noValidate autoComplete="off">
          <div className="Register">
            <h1>Register</h1>
            <TextField
              error={this.state.nameTextFieldError}
              id="standard-name"
              label={this.state.nameError}
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChange}
              margin="normal"
              name="username"
            />
            <TextField
              error={this.state.emailTextFieldError}
              id="standard-name"
              label={this.state.emailError}
              className={classes.textField}
              value={this.state.email}
              name="email"
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              error={this.state.passwordTextFieldError}
              id="standard-multiline-flexible"
              label={this.state.passwordError}
              multiline
              rowsMax="4"
              value={this.state.password}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              name="password"
            />
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.formSubmit}
              >
                {this.state.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
