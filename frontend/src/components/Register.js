import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import AuthService from '../services/auth.service';
import Header from './header/Header';
import Footer from './footer/Footer';
import Navigation from './navigation/Navigation';
// import '../App.css';

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className='alert alert-danger' role='alert'>
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage('');
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
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
          marginTop: -10,
          marginBottom: 30,
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
          {/* <div> */}
          <img
            src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
            alt='profile-img'
            style={{
              width: '96px',
              height: '96px',
              margin: '0 auto 10px',
              display: 'block',
              // -moz-border-radius: '50%',
              // -webkit-border-radius: '50%',
              borderRadius: '50%',
            }}
          />

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
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
                    validations={[required, vusername]}
                  />
                </div>

                <div className='form-group'>
                  <label
                    style={{ display: 'block', marginTop: '10px' }}
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <Input
                    type='text'
                    className='form-control'
                    name='email'
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
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
                    validations={[required, vpassword]}
                  />
                </div>

                <div
                  className='form-group'
                  style={{ marginTop: 20, marginBottom: 10 }}
                >
                  <button className='btn btn-primary btn-block'>Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className='form-group'>
                <div
                  className={
                    successful ? 'alert alert-success' : 'alert alert-danger'
                  }
                  role='alert'
                >
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

export default Register;
