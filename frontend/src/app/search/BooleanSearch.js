import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  IconButton,
  Paper,
  TextField,
  Divider,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { useStyles } from './Search.styles';
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { STATES } from 'mongoose';

function BooleanSearch() {
  const classes = useStyles();
  const history = useHistory();
  const [textInput, setTextInput] = useState('');
  const [submitText, setSubmitText] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchForText, setSearchForText] = useState('');
  const [typeTraverse, setTypeTraverse] = useState([]);
  const [mineral, setMineral] = useState([]);
  const [volcano, setVolcano] = useState([]);
  // const [openState, setOpenState] = useState(true);
  const [optionState, setOptionState] = useState({
    olivine: false,
    anorthoclase: false,
    erebus: false,
    east: false,
    dotsero: false,
    checkedRTR: false,
    y1997: false,
    y20056: false,
    y4150: false,
    RTR: false,
    RTC: false,
    ROL: false,
    None: false,
  });

  const {
    olivine,
    anorthoclase,
    erebus,
    east,
    dotsero,
    checkedRTR,
    y1997,
    y20056,
    y4150,
    RTR,
    RTC,
    ROL,
    None,
  } = optionState;

  const handleOption = (event) => {
    setOptionState({
      ...optionState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClear = () => {
    setOptionState(false);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setTextInput(value);
  };

  let jsonList = [];

  const handleSubmit = (event) => {
    const value = event.target.value;
    event.preventDefault();
    setButtonClicked(true);

    // if (textInput.includes(' and ')) {
    //   arraySearch = textInput.split(' and ');
    //   multipleInput = arraySearch.join('&');
    //   console.log('array search is: ' + arraySearch);
    // } else {
    //   arraySearch[0] = textInput;
    // }

    // const mineral = {

    // }
    let mineral = {
      olivine: optionState.olivine,
      anorthoclase: optionState.anorthoclase,
    };
    const { olivine, anorthoclase } = mineral;
    let volcano = {
      erebus: optionState.erebus,
      east: optionState.east,
      dotsero: optionState.dotsero,
    };
    const { erebus, east, dotsero } = volcano;
    let eruption = {
      y1997: optionState.y1997,
      y20056: optionState.y20056,
      y4150: optionState.y4150,
    };
    const { y1997, y20056, y4150 } = eruption;
    let type = {
      RTR: optionState.RTR,
      RTC: optionState.RTC,
      ROL: optionState.ROL,
      None: optionState.None,
    };
    const { RTR, RTC, ROL, None } = type;
    let url =
      '/crystal/search?' +
      (olivine == true || anorthoclase == true
        ? 'mineral=' +
          (olivine == true ? 'olivine' : 'afsdff') +
          (anorthoclase == true ? ',anorthoclase' : ',asdgasdf')
        : '') +
      //
      (erebus == true || east == true || dotsero == true
        ? '&volcano=' +
          (erebus == true ? 'erebus' : 'afsdff') +
          (east == true ? ',east' : ',afsdff') +
          (dotsero == true ? ',dotsero' : ',afsdff')
        : '') +
      //
      (y1997 == true || y20056 == true || y4150 == true
        ? '&eruption=' +
          (y1997 == true ? '1997' : 'afsdff') +
          (y20056 == true ? ',2005-2006' : ',afsdff') +
          (y4150 == true ? ',4150' : ',afsdff')
        : '') +
      //
      (RTR == true || RTC == true || ROL == true || None == true
        ? '&type=' +
          (RTR == true ? 'Rim-to-Rim' : 'afsdff') +
          (RTC == true ? ',Rim-to-Core' : ',afsdff') +
          (ROL == true ? ',Rim Only' : ',afsdff') +
          (None == true ? ',None' : ',afsdff')
        : '');

    const fetchData = async () => {
      try {
        const result = await fetch(url);
        const json = await result.json();
        setSearchData(json);
        jsonList = json;
        setButtonClicked(false);
        console.log(url);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 16,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const columns = [
    { id: 'crystal name', label: 'Crystal Name', minWidth: 200, align: 'left' },
    {
      id: 'type traverse',
      label: 'Type Traverse',
      minWidth: 120,
      align: 'left',
    },
    { id: 'mineral', label: 'Mineral', minWidth: 120, align: 'left' },
    { id: 'volcano', label: 'Volcano', minWidth: 120, align: 'left' },
    { id: 'eruption', label: 'Eruption Year', minWidth: 120, align: 'left' },
  ];

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <Paper>
      <Typography
        component='h1'
        variant='h5'
        align='center'
        style={{ paddingTop: 30, paddingBottom: 10 }}
      >
        Crystal Database Search
      </Typography>
      <hr
        style={{
          marginLeft: 25,
          marginRight: 25,
          color: '#168780',
        }}
      ></hr>
      <Typography
        style={{
          paddingLeft: 45,
          fontSize: 17,
          marginTop: 10,
          color: '#168780',
          marginBottom: 5,
        }}
      >
        <i>Please check boxes for each properties you want to filter out:</i>
      </Typography>
      <div className={classes.booleanContainer}>
        <div className={classes.optionContainer}>
          <Typography className={classes.optionText}>Mineral: </Typography>
          <FormControl className={classes.options}>
            <Select
              displayEmpty
              value={typeTraverse}
              onChange={handleOption}
              // open={openState}
            >
              <MenuItem value='' disabled>
                Choose your options
              </MenuItem>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={anorthoclase}
                      onChange={handleOption}
                      name='anorthoclase'
                      color='primary'
                      onClick={handleClick}
                    />
                  }
                  label='Anorthoclase'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={olivine}
                      onChange={handleOption}
                      name='olivine'
                      color='primary'
                    />
                  }
                  label='Olivine'
                />
              </div>
            </Select>
          </FormControl>
        </div>
        <div className={classes.optionContainer}>
          <Typography className={classes.optionText}>Volcano: </Typography>
          <FormControl className={classes.options}>
            <Select displayEmpty value={typeTraverse} onChange={handleOption}>
              <MenuItem value='' disabled>
                Choose your options
              </MenuItem>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dotsero}
                      onChange={handleOption}
                      name='dotsero'
                      color='primary'
                    />
                  }
                  label='Dotsero'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={east}
                      onChange={handleOption}
                      name='east'
                      color='primary'
                    />
                  }
                  label='East Pacific Rise'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={erebus}
                      onChange={handleOption}
                      name='erebus'
                      color='primary'
                    />
                  }
                  label='Erebus'
                />
              </div>
            </Select>
          </FormControl>
        </div>
        <div className={classes.optionContainer}>
          <Typography className={classes.optionText}>
            Eruption Year:{' '}
          </Typography>
          <FormControl className={classes.options}>
            <Select displayEmpty value={typeTraverse} onChange={handleOption}>
              <MenuItem value='' disabled>
                Choose your options
              </MenuItem>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={y1997}
                      onChange={handleOption}
                      name='y1997'
                      color='primary'
                    />
                  }
                  label='1997'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={y20056}
                      onChange={handleOption}
                      name='y20056'
                      color='primary'
                    />
                  }
                  label='2005-2006'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={y4150}
                      onChange={handleOption}
                      name='y4150'
                      color='primary'
                    />
                  }
                  label='4150'
                />
              </div>
            </Select>
          </FormControl>
        </div>
        <div className={classes.optionContainer}>
          <Typography className={classes.optionText}>
            Type Traverse:{' '}
          </Typography>
          <FormControl className={classes.options}>
            <div className={classes.typeOptions}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={RTR}
                    onChange={handleOption}
                    name='RTR'
                    color='secondary'
                  />
                }
                label='Rim-to-Rim'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={RTC}
                    onChange={handleOption}
                    name='RTC'
                    color='secondary'
                  />
                }
                label='Rim-to-Core'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ROL}
                    onChange={handleOption}
                    name='ROL'
                    color='secondary'
                  />
                }
                label='Rim Only'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={None}
                    onChange={handleOption}
                    name='None'
                    color='secondary'
                  />
                }
                label='None'
              />
            </div>
          </FormControl>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginLeft: 360,
          marginTop: -10,
          marginBottom: 10,
        }}
      >
        <Button
          variant='outlined'
          color='primary'
          onClick={handleClear}
          className={classes.button}
        >
          Clear all fields
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          className={classes.button}
        >
          Search
        </Button>
      </div>

      <Typography style={{ marginLeft: 25, paddingBottom: 20 }}>
        {searchData.length != 0 ? (
          <Typography>
            <TableContainer className={classes.tableContainer}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            fontWeight: 'bold',
                            borderColor: 'green',
                            borderBottomWidth: 3,
                          }}
                        >
                          {column.label}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <StyledTableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={row.name}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <StyledTableCell
                                key={column.id}
                                align={column.align}
                              >
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </StyledTableCell>
                            );
                          })}
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={searchData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Typography>
        ) : (
          // 'No result found.'
          <div>
            <br></br>
            <br></br>
            <TableContainer className={classes.tableContainer}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            fontWeight: 'bold',
                            borderColor: 'green',
                            borderBottomWidth: 3,
                          }}
                        >
                          {column.label}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <br></br>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Loader />
            </div>
          </div>
        )}
      </Typography>
    </Paper>
  );
}
export default BooleanSearch;
