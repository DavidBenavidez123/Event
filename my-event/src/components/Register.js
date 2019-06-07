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
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
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
      console.log('hello this an success password');
      let data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };
      axios
        .post(' ', data)
        .then(res => {
          this.setState({ sent: true, buttonText: 'Sign Up Complete' });
        })
        .catch(() => {
          this.setState({ buttonText: 'Failed to Sign up' });
          console.log('password not sent');
        });

      // clear form
      this.setState({
        name: '',
        nameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
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
    if (!this.state.name.length) {
      isError = true;
      this.setState({
        nameError: 'Cannot be empty',
        nameTextFieldError: true
      });
    } else {
      this.setState({
        nameError: '',
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
        passwordError: '',
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
        emailError: '',
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
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange}
              margin="normal"
              name="name"
            />
            <h3>{this.state.nameError}</h3>
            <TextField
              error={this.state.emailTextFieldError}
              id="standard-name"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              name="email"
              onChange={this.handleChange}
              margin="normal"
            />
            <h3>{this.state.emailError}</h3>
            <TextField
              error={this.state.passwordTextFieldError}
              id="standard-multiline-flexible"
              label="password"
              multiline
              rowsMax="4"
              value={this.state.password}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              name="password"
            />
            <h3>{this.state.passwordError}</h3>
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
