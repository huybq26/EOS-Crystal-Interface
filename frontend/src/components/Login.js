import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import AuthService from '../services/auth.service';
import Header from './header/Header';
import Footer from './footer/Footer';
import Navigation from './navigation/Navigation';
// import '../App.css';
//import './second.css';

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push('/profile');
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Navigation />
      <div
        className='col-md-12'
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 0,
          marginBottom: 40,
        }}
      >
        {/* <div className='card card-container'> */}
        <div
          style={{
            maxWidth: '350px',
            backgroundColor: '#f7f7f7',
            padding: '20px 25px 30px',
            margin: '0 auto 25px',
            marginTop: '50px',
            // -moz '2px',
            // -webkit-border-radius: '2px',
            borderRadius: '2px',
            // -moz-box-shadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
            // -webkit-box-shadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
        >
          <img
            style={{
              width: '96px',
              height: '96px',
              margin: '0 auto 10px',
              display: 'block',
              // -moz-border-radius: '50%',
              // -webkit-border-radius: '50%',
              borderRadius: '50%',
            }}
            src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
            alt='profile-img'
            className='profile-img-card'
          />

          <Form onSubmit={handleLogin} ref={form}>
            <div className='form-group'>
              <label
                style={{ display: 'block', marginTop: '10px' }}
                htmlFor='username'
              >
                Username
              </label>
              <Input
                type='text'
                className='form-control'
                name='username'
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className='form-group'>
              <label
                style={{ display: 'block', marginTop: '10px' }}
                htmlFor='password'
              >
                Password
              </label>
              <Input
                type='password'
                className='form-control'
                name='password'
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>

            <div
              className='form-group'
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <button className='btn btn-primary btn-block' disabled={loading}>
                {loading && (
                  <span className='spinner-border spinner-border-sm'></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className='form-group'>
                <div className='alert alert-danger' role='alert'>
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
