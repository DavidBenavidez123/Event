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

class Login extends Component {
  state = {
    username: '',
    nameError: 'Name',
    password: '',
    passwordError: 'Password',
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
        username: this.state.username,
        password: this.state.password
      };
      axios
        .post('http://localhost:3300/api/login', data)
        .then(res => {
          console.log(res.data);
          localStorage.setItem('jwt', res.data.token);
          localStorage.setItem('userId', res.data.id);
          this.props.history.push('/');
          window.location.reload();
        })
        .catch(err => {
          console.log('Error', err);
          this.setState({
            buttonText: 'Login Failed'
          });
        });

      // clear form
      this.setState({
        username: '',
        nameError: '',
        password: '',
        passwordError: '',
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
        passwordError: 'Cannot be empty ',
        emailTextFieldError: true
      });
    } else {
      this.setState({
        passwordError: 'Password',
        emailTextFieldError: false
      });
    }
    return isError;
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="LoginPage">
        <form className={classes.container} noValidate autoComplete="off">
          <div className="Login">
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
              id={"standard-name"}
              label={this.state.passwordError}
              className={classes.textField}
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
              margin="normal"
            />
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
