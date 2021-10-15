import React from 'react';
import AuthService from '../services/auth.service';
import { Link } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Navigation from './navigation/Navigation';
// import '../App.css';

const Welcome = (props) => {
  if (props.match.path === '/confirm/:confirmationCode') {
    AuthService.verifyUser(props.match.params.confirmationCode);
  }

  return (
    <div>
      <Header />
      <Navigation />
      <div
        className='container'
        style={{ marginBottom: 30, marginTop: 40, marginLeft: 20 }}
      >
        <header className='jumbotron'>
          <h3>
            <strong>Account verified!</strong>
          </h3>
        </header>
        <Link to={'/login'} className='nav-link'>
          Please login here.
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Welcome;
