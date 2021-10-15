import React, { useCallback, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import logoImage from './eos-cropped.png';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { NavigationStyles } from './Navigation.styles';
import Auth from '../../app/authentication/Auth';
import AuthServices from '../../app/authentication/Auth.service';
import { useHistory } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import AuthService from '../../services/auth.service';

interface UserData {
  username: string;
  password: string;
  prevState: null;
}
export default function Navigation(props: { authenticated: boolean }) {
  const { authenticated } = props;
  const classes = NavigationStyles();
  const [openLogin, setOpenLogin] = useState(false);
  const history = useHistory();

  const handleOnClick = useCallback(
    (url: string) => history.push(url),
    [history]
  );

  const openLoginDialog = () => {
    if (!authenticated) {
      setOpenLogin(true);
    } else {
      AuthServices.logout();
    }
  };
  // const classes = AppStyles();
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

  return (
    <AppBar
      className={classes.header}
      position='static'
      style={{ marginTop: 7 }}
    >
      <FadeIn>
        <Toolbar>
          <Button
            className={classes.navBtn}
            color='inherit'
            onClick={() => handleOnClick('/home')}
          >
            Home
          </Button>
          <Button
            className={classes.navBtn}
            color='inherit'
            onClick={() => handleOnClick('/introduction')}
          >
            About
          </Button>
          <Button
            className={classes.navBtn}
            color='inherit'
            onClick={() => handleOnClick('/quick-search')}
          >
            Quick Search
          </Button>
          <Button
            className={classes.navBtn}
            color='inherit'
            onClick={() => handleOnClick('/boolean-search')}
          >
            Advanced Search
          </Button>
          <Button
            className={classes.navBtn}
            color='inherit'
            onClick={() => handleOnClick('/input')}
          >
            Upload Data
          </Button>
          {/* <nav className='navbar navbar-expand navbar-dark bg-dark'> */}
          {/* <div className='navbar-nav mr-auto'>
          </div> */}

          {currentUser ? (
            <div className={classes.loginBtn}>
              <Button
                className={classes.navBtn}
                color='inherit'
                onClick={() => handleOnClick('/profile')}
              >
                My Profile
              </Button>
              <Button
                className={classes.navBtn}
                color='inherit'
                // onClick={() => handleOnClick('/login')}
              >
                <a href='/login' className='nav-link' onClick={logOut}>
                  Log out
                </a>
              </Button>
              {/* <li className='nav-item'>
                  <a href='/login' className='nav-link' onClick={logOut}>
                    LogOut
                  </a>
                </li> */}
            </div>
          ) : (
            <div className={classes.loginBtn}>
              {/* <li className='nav-item'>
                  <Link to={'/login'} className='nav-link'>
                    Login
                  </Link>
                </li> */}
              <Button
                className={classes.navBtn}
                color='inherit'
                onClick={() => handleOnClick('/register')}
              >
                Register
              </Button>
              <Button
                className={classes.navBtn}
                color='inherit'
                onClick={() => handleOnClick('/login')}
              >
                Log in
              </Button>
              {/* <li className='nav-item'>
                  <Link to={'/register'} className='nav-link'>
                    Sign Up
                  </Link>
                </li> */}
            </div>
          )}
          {/* </nav> */}

          {/* <Button
            className={`${classes.navBtn} ${classes.loginBtn}`}
            onClick={openLoginDialog}
            color='inherit'
          >
            {authenticated ? 'Logout' : 'Login'}
          </Button> */}
        </Toolbar>
      </FadeIn>

      <Auth
        onClose={() => {
          setOpenLogin(false);
        }}
        selectedValue={0}
        open={openLogin}
      />
    </AppBar>
  );
}
