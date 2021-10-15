import React from 'react';
import AuthService from '../services/auth.service';
import Header from './header/Header';
import Footer from './footer/Footer';
import Navigation from './navigation/Navigation';
// import '../App.css';

const Profile = (props) => {
  const currentUser = AuthService.getCurrentUser();

  if (props.match.path === '/confirm/:confirmationCode') {
    AuthService.verifyUser(props.match.params.confirmationCode);
  }

  return (
    <div>
      <Header />
      <Navigation />
      <div
        style={{ marginLeft: 35, marginTop: 35, marginBottom: 50 }}
        className='container'
      >
        <header className='jumbotron'>
          <h3>
            <strong>My Profile</strong>
          </h3>
        </header>
        <hr style={{ marginRight: 15, marginBottom: 20 }} />
        {/* <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p> */}
        <p>
          <strong>Username:</strong> {currentUser.username}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Status:</strong> {currentUser.status}
        </p>
        <strong>Authorities: </strong>Normal User
        <ul>
          {/* {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)} */}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
