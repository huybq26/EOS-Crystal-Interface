import React, { useState, useCallback, useEffect } from 'react';
// import axios from 'axios';
// import image from '../../assets/showcase.jpg';
import background from './background.jpg';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import FadeIn from 'react-fade-in';
// import image1 from '../../assets/4420_head_Jx/fig4.png';

export default function Home() {
  const history = useHistory();
  const [getMessage, setGetMessage] = useState('');

  const handleOnClick = useCallback((url) => history.push(url), [history]);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/fig')
  //     .then((response) => {
  //       console.log('SUCCESS', response);
  //       setGetMessage(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div
      style={{
        position: 'relative',
        //backgroundImage: `url(${image})`,
        backgroundImage: `url(${background})`,
        //backgroundImage: `url('https://thumbs.dreamstime.com/b/blue-glitter-seamless-square-texture-blue-glitter-seamless-square-texture-high-quality-texture-extremely-high-resolution-127964643.jpg')`,
        //backgroundImage: `url('https://www.thoughtco.com/thmb/105bMN_1rWH_rapHtT9rDgtQvCE=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/fluorite-mineral-652050409-585166cb3df78c491e1241b3.jpg')`,
        //backgroundImage: `url('https://wallpaperaccess.com/full/1426870.png')`,
        //backgroundImage: `url('https://previews.123rf.com/images/docer2000/docer20001606/docer2000160600026/58405147-green-crystal-abstract-texture-cubism-painted-backgrounds.jpg')`,
        //backgroundImage: `url('https://previews.123rf.com/images/mcandy/mcandy1610/mcandy161000095/67736162-bright-blue-texture-from-natural-gemstone-blue-crystal-background-for-your-jewelry-designs-.jpg')`,
        //backgroundImage: `url('https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F538592052%2FSmokey-quartz-crystals%2F960x0.jpg%3Ffit%3Dscale')`,
        backgroundSize: 'cover',
        height: '100vh',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            color: '#fff',
            height: '100%',
            width: '80%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <FadeIn>
            <h1
              style={{
                fontSize: '3.7rem',
                lineHeight: 1.2,
                marginBottom: '1rem',
                fontFamily: 'Raleway',
                marginBottom: 15,
                marginTop: -85,
              }}
            >
              Crystal DB
            </h1>
            <p style={{ fontSize: 26, marginTop: 0, fontFamily: 'Raleway' }}>
              A web-based tool to contribute, query and analyze EOS Crystal Data
            </p>
          </FadeIn>

          <FadeIn>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
                textAlign: 'center',
              }}
            >
              <Button
                style={{
                  display: 'flex',
                  // backgroundColor: '#28a745',
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  // minWidth: 12,
                  marginRight: 15,
                  textAlign: 'center',
                  fontFamily: 'Raleway',
                }}
                onClick={() => handleOnClick('/introduction')}
              >
                About us
              </Button>
              <Button
                style={{
                  display: 'flex',
                  backgroundColor: '#28a745',
                  color: 'white',
                  textAlign: 'center',
                  fontFamily: 'Raleway',
                  marginRight: 15,
                }}
                onClick={() => handleOnClick('/input')}
              >
                Upload data
              </Button>
              <Button
                style={{
                  display: 'flex',
                  backgroundColor: '#e0a604',
                  color: 'white',
                  textAlign: 'center',
                  fontFamily: 'Raleway',
                }}
                onClick={() => handleOnClick('/boolean-search')}
              >
                Query data
              </Button>
            </div>
          </FadeIn>

          {/* <div>
              {getMessage != null ? <h3>{getMessage}</h3> : <h3>LOADING</h3>}
            </div> */}
          {/* <div>
              <img src={image1} />
            </div> */}
        </div>
      </div>
    </div>
  );
}
