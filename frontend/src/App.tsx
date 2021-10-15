import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header/Header';
import Navigation from './components/navigation/Navigation';
import NavigationIndex from './components/navigation/NavigationIndex';
import { AppStyles } from './App.styles';
import AuthServices from './app/authentication/Auth.service';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Introduction from './app/home/Home';
import Index from './app/index/Home';
import IndexNavigation from './components/indexNavigation/Navigation';
import Input from './app/input/Input';
import Search from './app/search/Search.js';
import { InputAdornment } from '@material-ui/core';
import BooleanSearch from './app/search/BooleanSearch';

import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

import AuthService from './services/auth.service';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';
import Welcome from './components/Welcome';

interface UserData {
  username: string;
  password: string;
  prevState: null;
}

function App() {
  const classes = AppStyles();
  const [authStatus, setAuthStatus] = React.useState(false);

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  React.useEffect(() => {
    AuthServices.subscribeAuthEvent((status) => {
      setAuthStatus(status);
    });

    // fetch profile of users on page render
    AuthServices.fetchProfile();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />

      <Router>
        {/* <main className={classes.main}></main> */}

        <main>
          <Switch>
            <Route path={'/input'}>
              <Header />
              <Navigation authenticated={authStatus} />
              <Input />
              <Footer />
            </Route>
            <Route path={'/quick-search'}>
              <Header />
              <Navigation authenticated={authStatus} />
              <Search />
              <Footer />
            </Route>
            <Route path={'/boolean-search'}>
              <Header />
              <Navigation authenticated={authStatus} />
              <BooleanSearch />
              <Footer />
            </Route>
            <Route path={'/introduction'}>
              <Header />
              <Navigation authenticated={authStatus} />
              <Introduction />
              <Footer />
            </Route>
            {/* <Route path={'/login'} component={Login}>
              <Header />
              <Navigation authenticated={authStatus} />
              <Login />
              <Footer />
            </Route> */}
            {/* <Route path={'/register'}>
              <Header />
              <Navigation authenticated={authStatus} />
              <Register />
              <Footer />
            </Route>
            <Route path={['/profile']}>
              <Header />
              <Navigation authenticated={authStatus} />
              <Profile />
              <Footer />
            </Route>
            <Route path={'/confirm/:confirmationCode'}>
              <Header />
              <Navigation authenticated={authStatus} />
              <Welcome />
              <Footer />
            </Route> */}
            <Route path={'/login'} component={Login} />
            <Route path={'/register'} component={Register} />
            <Route path={['/profile']} component={Profile} />
            <Route path={'/confirm/:confirmationCode'} component={Welcome} />

            <Route path={'/'}>
              <NavigationIndex authenticated={authStatus} />
              {/* <IndexNavigation /> */}
              <Index />
            </Route>
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;
