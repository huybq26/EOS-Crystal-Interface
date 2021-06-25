import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  IconButton,
  Paper,
  TextField,
  Divider,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { useStyles } from './Search.styles';
import { useHistory } from 'react-router-dom';

function Search() {
  const classes = useStyles();
  const history = useHistory();
  const [textInput, setTextInput] = useState('');
  const [submitText, setSubmitText] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleChange = (event) => {
    const value = event.target.value;
    setTextInput(value);
  };
  let jsonList = [];

  const handleSubmit = (event) => {
    const value = event.target.value;
    setButtonClicked(true);
    event.preventDefault();
    setSubmitText(value);
    console.log(textInput);

    let arraySearch = [];
    let multipleInput = '';

    if (textInput.includes(' and ')) {
      arraySearch = textInput.split(' and ');
      multipleInput = arraySearch.join('&');
      console.log(multipleInput);
    }
    let url =
      '/search?q=' +
      arraySearch[0].toString().split(' ').join('+') +
      (arraySearch[1]
        ? '&q2=' + arraySearch[1].toString().split(' ').join('+')
        : '') +
      (arraySearch[2]
        ? '&q3=' + arraySearch[2].toString().split(' ').join('+')
        : '') +
      (arraySearch[3]
        ? '&q4=' + arraySearch[3].toString().split(' ').join('+')
        : '') +
      (arraySearch[4]
        ? '&q5=' + arraySearch[4].toString().split(' ').join('+')
        : '');
    // let url = '/search?q=' + textInput.toString().split(' ').join('+');
    // if (multipleInput != '') {
    //   url = '/search?q=' + multipleInput.toString().split(' ').join('+');
    // }
    // console.log(url);

    const fetchData = async () => {
      try {
        const result = await fetch(url);
        const json = await result.json();
        setSearchData(json);
        jsonList = json;
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  };
  const Loader = () => {
    if (buttonClicked) {
      return (
        <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' />
      );
    }
    return '';
  };

  return (
    <Paper>
      <Typography
        component='h1'
        variant='h5'
        align='center'
        style={{ paddingTop: 20, paddingBottom: 10 }}
      >
        Search in Crystal Database
      </Typography>
      <IconButton aria-label='menu' style={{ marginLeft: 30 }}>
        <MenuIcon />
      </IconButton>
      <TextField
        onChange={handleChange}
        margin='normal'
        // id='crystal-name'
        placeholder='Search Database'
      ></TextField>
      <IconButton
        type='submit'
        className={classes.iconButton}
        aria-label='search'
        onClick={handleSubmit}
      >
        <SearchIcon />
      </IconButton>
      <Divider orientation='vertical' />
      <br></br>
      <Typography style={{ paddingLeft: 30, fontSize: 15 }}>
        <i>
          Please search with keywords seperated by "and".<br></br>
          E.g. Erebus and 1997
        </i>
      </Typography>
      <br></br>

      <Typography style={{ marginLeft: 25, paddingBottom: 20 }}>
        {searchData.length != 0 ? (
          <Typography>
            {/* <ul>{items}</ul> */}
            <Typography
              component='h3'
              variant='h5'
              align='center'
              style={{ paddingBottom: 10 }}
            >
              Search result
            </Typography>
            <div>
              {searchData.map((data) => (
                <div key={data.name}>
                  <ul>
                    <li>Crystal name: {data['crystal name']}</li>
                    <li>Type traverse: {data['type traverse']}</li>
                    <li>Mineral name: {data['mineral']}</li>
                    <li>Eruption year: {data['eruption']}</li>
                  </ul>
                </div>
              ))}
            </div>
          </Typography>
        ) : (
          // 'No result found.'
          <Loader />
        )}
      </Typography>
    </Paper>
  );
}
export default Search;
