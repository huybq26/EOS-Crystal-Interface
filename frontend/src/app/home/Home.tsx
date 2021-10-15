import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  InputBase,
  Divider,
  IconButton,
  TextField,
  //   MenuIcon,
  //   SearchIcon,
  //   DirectionsIcon,
} from '@material-ui/core';
import { useStyles } from './Home.styles';
import { useHistory } from 'react-router-dom';
// import InputBase from '@material-ui/core/InputBase';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import FadeIn from 'react-fade-in';

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [textInput, setTextInput] = useState('');

  const handleChange = (event: any) => {
    setTextInput(event.target.value);
  };
  const handleSubmit = (event: any) => {
    setTextInput(event.target.value);
    if (textInput == 'Larderello') {
      history.push('/search/0');
    } else if (textInput == 'Alban Hills') {
      history.push('/search/1');
    } else if (textInput == 'Vulsini') {
      history.push('/search/2');
    }
  };
  return (
    <Paper className={classes.paper}>
      <Typography
        component='h1'
        variant='h4'
        align='left'
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
      >
        Introduction
      </Typography>

      <Typography className={classes.textDescription}>
        <FadeIn>
          The Crystal and Workspace Database (CWD) facilitates storing and
          managing information about crystal data for ready accessibility to
          researchers. The CWD offers three main features:
          <ul>
            <li>Users can share the uploaded data with collaborators.</li>
            <li>
              Users can contribute crystal data to EOS internal database for
              future access and use.
            </li>
            <li>
              Users can query and export data from EOS internal database with
              advanced search (boolean search) or quick search (with keywords
              separated by "and").
            </li>
          </ul>
        </FadeIn>
        <FadeIn>
          The CWD offers three main menus allowing users to input, organize, and
          query data.
          <ul>
            <li>
              Access Database: Users can find and download the available data
              based on choices for one or more specific Minerals, Volcanoes,
              Eruption years, or Type traverses in{' '}
              <a href='/boolean-search'>advanced search</a> function. Users can
              query the choices on both typing and clicking.
            </li>
            <li>
              Users can also type, search and download data with keywords
              separated by "and", i.e. "Erebus and 1997" in{' '}
              <a href='/quick-search'>quick search</a>.
            </li>
            <li>
              Upload data: Users can create Excel files based on provided
              template (can be found on <a href='/input'>Upload data</a> page).
              After that, user can upload multiple Excel files and modify data
              of each file (if necessary) directly on the web. Successfully
              uploaded data will be contributed to internal EOS Crystal
              Database.
            </li>
          </ul>
          <i>
            Note: Users must log in first to contribute data. However, logging
            in is not required for searching and downloading data.
          </i>
        </FadeIn>
      </Typography>
    </Paper>
  );
}
