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
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { useStyles } from './Search.styles';
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { exportExcelFile } from '../../utils/JsonToExcel';
import exportJsonFile from '../../utils/JsonExport';

function Search() {
  const classes = useStyles();
  const history = useHistory();
  const [textInput, setTextInput] = useState('');
  const [submitText, setSubmitText] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchForText, setSearchForText] = useState('');
  const [resultURL, setResultURL] = useState('');
  const handleChange = (event) => {
    const value = event.target.value;
    setTextInput(value);
  };
  let jsonList = [];

  const handleSubmit = (event) => {
    const value = event.target.value;
    event.preventDefault();
    setSubmitText(value);
    setSearchForText(textInput);
    setButtonClicked(true);
    console.log(textInput);

    let arraySearch = [];
    let multipleInput = '';

    if (textInput.includes(' and ')) {
      arraySearch = textInput.split(' and ');
      multipleInput = arraySearch.join('&');
      console.log('array search is: ' + arraySearch);
    } else {
      arraySearch[0] = textInput;
    }
    let url =
      '/crystal' +
      (arraySearch[0]
        ? '?q=' + arraySearch[0].toString().split(' ').join('+')
        : '') +
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
    setResultURL(url);
    const fetchData = async () => {
      try {
        const result = await fetch(url);
        const json = await result.json();
        setSearchData(json);
        console.log(json);
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
        <i>
          Please search with keywords seperated by "and", e.g. Erebus and 1997:
        </i>
      </Typography>
      <IconButton aria-label='menu' style={{ marginLeft: 60, marginTop: 10 }}>
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

      <Typography style={{ marginLeft: 25, paddingBottom: 20 }}>
        {searchData.length != 0 ? (
          <Typography>
            {/* <ul>{items}</ul> */}
            <Typography
              component='h3'
              variant='h5'
              align='center'
              style={{ marginBottom: 10 }}
            >
              Search results for "{searchForText}":
            </Typography>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 10,
                marginRight: 20,
                marginBottom: 10,
              }}
            >
              <Button
                onClick={() => exportJsonFile(searchData, 'data_json')}
                style={{
                  borderRadius: 35,
                  backgroundColor: '#21b6ae',
                  padding: '10px 20px',
                  fontSize: '15px',
                }}
                variant='contained'
                color='primary'
              >
                Export data in JSON
              </Button>
              <Button
                onClick={() => exportExcelFile(searchData)}
                style={{
                  borderRadius: 35,
                  backgroundColor: '#34bf24',
                  padding: '10px 20px',
                  fontSize: '15px',
                }}
                variant='contained'
                color='primary'
              >
                Export data in Excel
              </Button>
            </div>
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
export default Search;
