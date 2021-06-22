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
      <Typography component='h1' variant='h4' align='left'>
        Introduction
      </Typography>
      <IconButton aria-label='menu'>
        <MenuIcon />
      </IconButton>
      <TextField
        onChange={handleChange}
        name='crystalNameInput'
        margin='normal'
        // id='crystal-name'
        placeholder='SearchDatabase'
      ></TextField>

      <IconButton
        type='submit'
        className={classes.iconButton}
        aria-label='search'
      >
        <SearchIcon onClick={handleSubmit} />
      </IconButton>
      <Divider orientation='vertical' />
      <IconButton
        color='primary'
        className={classes.iconButton}
        aria-label='directions'
      ></IconButton>
      <Typography className={classes.textDescription}>
        The Petrology and Workspace Database (PWD) facilitates storing and
        managing information about petrological data for ready accessibility to
        researchers. The data management system allows compiling multi-level
        dataset as images, analyses, results, and time series that can be
        interactively explored from the work space. The PWD offers three main
        features:
        <ul>
          <li>
            Users can organize data in work space from field work to analytical
            techniques by linking the files between them in an interactive work
            space.
          </li>
          <li>
            Users can share the uploaded data with collaborators (choosing the
            level of privacy for each project).
          </li>
          <li>
            Users can create an internal database with their collaborators.
          </li>
        </ul>
        The PWD offers two main menus allowing users to input, organize, plot,
        and query data.
        <ul>
          <li>
            Input: Users can create new projects for adding their data. When
            creating the project users can choose between different degrees of
            privacy/sharing. The listed volcanoes and eruptions are according to
            Smithsonian, but users can add new volcanoes/eruptions. By using the
            work space and the associated tools users can link multi-level data
            and produce plots.
          </li>

          <li>
            Access Database: Users can find the available data for a specific
            eruption or volcano. Users can query the data from the map or from
            one of the three lists: Volcano, Project, and Sample List.
          </li>
        </ul>
        <i>
          *Users need to be registered to access the database and to upload data
        </i>
      </Typography>
    </Paper>
  );
}
