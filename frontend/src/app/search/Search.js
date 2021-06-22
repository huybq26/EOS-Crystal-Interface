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
    event.preventDefault();
    setSubmitText(value);
    console.log(textInput);

    const url = '/search?' + textInput.toString();

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
  useEffect(() => { }, []);
  console.log(searchData)
  if (searchData.length > 0) {
    console.log(searchData[0]["crystal name"])
  }
  


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
          Please search with this format:<br></br>
          "attribute_1=value_1&attribute_2=value_2&..."<br></br>
          E.g. eruption=1997&volcano=Erebus
        </i>
      </Typography>
      <br></br>

      <Typography style ={{marginLeft: 25, paddingBottom : 20}}>
        {searchData.length != 0 ? (
          <Typography>
            {/* <ul>{items}</ul> */}
            <Typography
        component='h3'
        variant='h5'
        align='center'
        style={{paddingBottom: 10 }}
      >
        Search result
      </Typography>
            <div>{searchData.map(person => <div key={person.name}>
              <ul>
                <li>Crystal name: {person["crystal name"]}</li>
                <li>Type traverse: {person["type traverse"]}</li>
                <li>Mineral name: {person["mineral"]}</li>
                <li>Eruption year: {person["eruption"]}</li>
              </ul>
              
            </div>)}</div>
          </Typography>
        ) : (
          'No result found.'
        )}
      </Typography>
    </Paper>
  );
}
export default Search;
