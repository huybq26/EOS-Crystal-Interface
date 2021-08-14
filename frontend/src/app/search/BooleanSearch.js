import React, { useState, useEffect, createRef } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Checkbox,
  Button,
} from '@material-ui/core';
import { useStyles } from './Search.styles';
import { useHistory } from 'react-router-dom';
import { exportExcelFile } from '../../utils/JsonToExcel';
import exportJsonFile from '../../utils/JsonExport';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Globals from '../../globals';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

function BooleanSearch() {
  const classes = useStyles();
  const history = useHistory();
  const [textInput, setTextInput] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searchFirstTime, setSearchFirstTime] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mineral, setMineral] = useState([]);
  const [volcano, setVolcano] = useState([]);
  const [eruption, setEruption] = useState([]);
  const [type, setType] = useState([]);
  const [mineralArray, setMineralArray] = useState([]);
  const [volcanoArray, setVolcanoArray] = useState([]);
  const [eruptionArray, setEruptionArray] = useState([]);
  const [typeArray, setTypeArray] = useState([]);
  // const handleOption = (event) => {
  //   setOptionState({
  //     ...optionState,
  //     [event.target.name]: event.target.checked,
  //   });
  // };
  // let mineralArray = [];
  // let volcanoArray = [];
  // let eruptionArray = [];
  // let typeArray = [];
  const dataRetrieve = async () => {
    const host = Globals().crystalHost;
    try {
      let mineral = await fetch(host + '/crystal/mineral', {
        method: 'GET',
      });
      let volcano = await fetch(host + '/crystal/volcano', {
        method: 'GET',
      });
      let eruption = await fetch(host + '/crystal/eruption', {
        method: 'GET',
      });
      let type = await fetch(host + '/crystal/type', {
        method: 'GET',
      });
      setMineralArray(await mineral.json());
      setVolcanoArray(await volcano.json());
      setEruptionArray(await eruption.json());
      setTypeArray(await type.json());
      console.log('running');
    } catch (err) {
      console.log(err.message);
    }
  };

  const excelExport = () => {
    document.getElementById('search-button').click();

    exportExcelFile(searchData);

    // console.log(submitText);
    // setSearchData(submitText);
  };

  useEffect(() => {
    dataRetrieve();
  }, []);

  const onMineralChange = (event, values) => {
    setMineral(values);
  };
  // console.log(mineral);

  const onVolcanoChange = (event, values) => {
    setVolcano(values);
  };
  // console.log(volcano);

  const onEruptionChange = (event, values) => {
    setEruption(values);
  };
  // console.log(eruption);

  const onTypeChange = (event, values) => {
    setType(values);
  };
  // console.log(type);
  // console.log(mineral.length);

  const handleClear = () => {
    // setMineral([]);
    // setVolcano([]);
    // setEruption([]);
    // setType([]);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setTextInput(value);
  };
  let jsonList = [];

  const handleSubmit = (event) => {
    const value = event.target.value;
    event.preventDefault();
    setSearchFirstTime(true);
    setButtonClicked(true);

    let mineralString = '&mineral=';
    let volcanoString = '&volcano=';
    let eruptionString = '&eruption=';
    let typeString = '&type=';
    mineral.forEach((element) => (mineralString += `${element},`));
    volcano.forEach((element) => (volcanoString += `${element},`));
    eruption.forEach((element) => (eruptionString += `${element},`));
    type.forEach((element) => (typeString += `${element},`));
    let url =
      '/crystal/search?' +
      (mineral.length > 0 ? mineralString : '') +
      (volcano.length > 0 ? volcanoString : '') +
      (eruption.length > 0 ? eruptionString : '') +
      (type.length > 0 ? typeString : '');

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
        <i>
          Please choose or type in attributes for each property you want to
          filter out:
        </i>
      </Typography>
      <div className={classes.booleanContainer}>
        <div className={classes.optionContainer}>
          <div style={{ width: 500, marginLeft: 30 }}>
            <Autocomplete
              multiple
              limitTags={3}
              // disableCloseOnSelect
              options={mineralArray}
              onChange={onMineralChange}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Mineral'
                  margin='normal'
                  fullWidth
                />
              )}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </React.Fragment>
              )}
            />
          </div>
        </div>
        <div className={classes.optionContainer}>
          <div style={{ width: 500, marginLeft: 30 }}>
            <Autocomplete
              multiple
              limitTags={3}
              // disableCloseOnSelect
              options={volcanoArray}
              onChange={onVolcanoChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Volcano'
                  margin='normal'
                  fullWidth
                />
              )}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </React.Fragment>
              )}
            />
          </div>
        </div>
        <div className={classes.optionContainer}>
          <div style={{ width: 500, marginLeft: 30 }}>
            <Autocomplete
              multiple
              limitTags={3}
              // disableCloseOnSelect
              options={eruptionArray}
              onChange={onEruptionChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Eruption Year'
                  margin='normal'
                  fullWidth
                />
              )}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </React.Fragment>
              )}
            />
          </div>
        </div>
        <div className={classes.optionContainer}>
          <div style={{ width: 500, marginLeft: 30 }}>
            <Autocomplete
              multiple
              limitTags={3}
              // disableCloseOnSelect
              options={typeArray}
              onChange={onTypeChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Type traverse'
                  margin='normal'
                  fullWidth
                />
              )}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </React.Fragment>
              )}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginLeft: 360,
          marginTop: -15,
          marginBottom: 30,
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
          id='search-button'
        >
          Search
        </Button>
      </div>

      <Typography style={{ marginLeft: 25, paddingBottom: 20 }}>
        {searchData.length != 0 ? (
          <Typography>
            <Typography
              component='h3'
              variant='h5'
              align='center'
              style={{ marginBottom: 10 }}
            >
              Search results:
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
                onClick={() => excelExport()}
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
            {searchFirstTime ? (
              <div>
                <Typography
                  component='h3'
                  variant='h6'
                  align='center'
                  style={{ marginBottom: 10 }}
                >
                  No search result found.
                </Typography>
              </div>
            ) : (
              <div>
                <Typography component='h3' variant='h5' align='center'>
                  Search results:
                </Typography>
              </div>
            )}
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
