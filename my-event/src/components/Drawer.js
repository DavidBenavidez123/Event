import React from 'react';
import PropTypes, { func } from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, NavLink } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const ResponsiveDrawer = props => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function checkIfLoggedIn() {
    const token = localStorage.getItem('jwt');
    if (token) {
      return drawer();
    } else {
      return notLoggedInDrawer();
    }
  }

  function signout() {
    localStorage.removeItem('jwt');
    window.location.reload();
    props.history.push('/');
  }

  function notLoggedInDrawer() {
    return (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <NavLink exact activeStyle={{ color: '#3F51B5' }} to={'/'}>
            <ListItem button={'/'}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Events'} />
            </ListItem>
          </NavLink>
          <NavLink activeStyle={{ color: '#3F51B5' }} to={'/Login'}>
            <ListItem button={'Login'}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Login'} />
            </ListItem>
          </NavLink>
          <Link to={'/CreateEvent'} />
        </List>
      </div>
    );
  }

  function drawer() {
    return (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <NavLink activeStyle={{ color: '#3F51B5' }} exact to={'/'}>
            <ListItem button={'/'}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Events'} />
            </ListItem>
          </NavLink>
          <NavLink
            activeStyle={{
              color: '#3F51B5'
            }}
            to={'/CreateEvent'}
          >
            <ListItem button={'CreateEvent'}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Create an event'} />
            </ListItem>
          </NavLink>
          <NavLink activeStyle={{ color: '#3F51B5' }} to={'/PurchaseHistory'}>
            <ListItem button={'PurchaseHistory'}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Purchase History'} />
            </ListItem>
          </NavLink>
          <NavLink activeStyle={{ color: '#3F51B5' }} to={'/CreatedEvents'}>
            <ListItem button={'CreatedEvents'}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Created Events'} />
            </ListItem>
          </NavLink>
          <ListItem button={'Signout'}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText onClick={e => signout()} primary={'Signout'} />
          </ListItem>
        </List>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome {props.user.username}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {checkIfLoggedIn()}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {checkIfLoggedIn()}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default ResponsiveDrawer;
