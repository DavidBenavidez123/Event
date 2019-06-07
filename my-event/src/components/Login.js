import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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

class Login extends Component {
  state = {
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    buttonText: 'Login',
    emailTextFieldError: false,
    nameTextFieldError: false
  };

  formSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.setState({
        buttonText: '...sending'
      });
      console.log('hello this an success message');
      let data = {
        name: this.state.name,
        email: this.state.email
      };
      axios
        .post('', data)
        .then(res => {})
        .catch(() => {
          this.setState({ buttonText: 'Message has failed to send' });
          console.log('Login Failed');
        });

      // clear form
      this.setState({
        name: '',
        nameError: '',
        email: '',
        emailError: '',
        emailTextFieldError: false,
        nameTextFieldError: false
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
      <div className = "LoginPage">
      <form className={classes.container} noValidate autoComplete="off">
        <div className="Login">
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
          <Button
            onClick={this.formSubmit}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {this.state.buttonText}
          </Button>

          <div>
            <h2>Not registered yet , Register Now</h2>
            <Link to={'/Register'}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      </form>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
