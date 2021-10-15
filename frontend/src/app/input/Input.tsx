import React from 'react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Paper,
  LinearProgress,
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  NativeSelect,
} from '@material-ui/core';
import { InputStyles } from './Input.styles';
import { excelToJson } from '../../utils/ExcelToJson';
import DataUploadAPI from '../../api/dataUpload.api';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import AuthService from '../../services/auth.service';

interface UserData {
  username: string;
  password: string;
  prevState: null;
}

export default function Input() {
  const classes = InputStyles();
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const [{ processed, outstanding }, dispatchQueue] = React.useReducer(
    // processed is of processEntry type (single file)
    queueReducer,
    { processed: [], outstanding: [] }
  );

  const handleOnClick = useCallback(
    (url: string) => history.push(url),
    [history]
  );

  const uploaded = processed.length + outstanding.length;
  const remaining = outstanding.length;

  const removeCurrent = useCallback(
    () => dispatchQueue({ type: 'pop' }),
    [dispatchQueue]
  );
  const uploadFiles = useCallback(
    (files: FileList) =>
      dispatchQueue({
        type: 'upload',
        files: Array.from(files).map((file) => ({ file, fileName: file.name })),
      }),
    [dispatchQueue]
  );
  const clearQueue = useCallback(
    () => dispatchQueue({ type: 'clear' }),
    [dispatchQueue]
  );

  useEffect(() => {
    const entry = outstanding[0];
    if (entry) {
      processEntry(entry);
      dispatchQueue({ type: 'processing' });
    }
    async function changeState() {
      if (outstanding[0]) {
        const outstandingFirst = outstanding[0];
        const processedResult = await outstanding[0].result;
        if (processedResult) {
          setMineralNameInput(processedResult.result.json.mineral);
          setType(processedResult.result.json['type traverse']);
          setCrystalName(processedResult.result.json['crystal name']);
          setVolcanoNameInput(processedResult.result.json.volcano);
          setEruptionYearInput(processedResult.result.json.eruption);
          setReferenceInput(processedResult.result.json.reference);
          setType(processedResult.result.json['type traverse']);
          // setDOI(processedResult.result.json.author);
          setDOI('');
          setResearchTitle('');
        }
      }
    }
    changeState();
  }, [outstanding.length]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      uploadFiles(files);
    }
  };

  const nextData = async (event: any) => {
    // console.log(
    //   'Current processed array is: ' +
    //     (processed[0].fileName ? processed[0].fileName : 'later')
    // );
    // console.log('Current outstanding array is: ' + outstanding);

    const outstandingFirst = outstanding[0];
    const processedResult = await outstandingFirst.result; // mo
    console.log('current attributes: ' + processedResult?.result);
    // need to modify processedResult
    // the current problem is the default value displayed is slower than current file.
    // console.log(processedResult?.result.json);
    if (processedResult) {
      //   setCrystalName;

      // Set state from the value in file. I intended to use the state for the value.

      // this is to modify the json output file by using state value.
      processedResult.result.json.mineral = mineralNameInput;
      processedResult.result.json['crystal name'] = crystalNameInput;
      processedResult.result.json['type traverse'] = typeTraverse;
      processedResult.result.json.volcano = volcanoNameInput;
      processedResult.result.json.eruption = eruptionYearInput;
      processedResult.result.json.reference = referenceInput;
      processedResult.result.json['type traverse'] = typeTraverse;
      processedResult.result.json['research title'] = researchTitle;
      processedResult.result.json.DOI = doiInput;
      console.log(processedResult?.result);
      dispatchQueue({ type: 'processed', ...processedResult });
      // const outstandingSecond = outstanding[0];
      // const processedResult2 = await outstandingSecond.result;

      // if (processedResult2) {
      //   setMineralNameInput(processedResult2.result.json.mineral);
      //   setCrystalName(processedResult2.result.json['crystal name']);
      //   setVolcanoNameInput(processedResult2.result.json.volcano);
      //   setEruptionYearInput(processedResult2.result.json.eruption);
      //   setReferenceInput(processedResult2.result.json.reference);
      //   setType(processedResult2.result.json['type traverse']);
      //   setAuthor(processedResult2.result.json.author);
      //   setDOI(processedResult2.result.json.author);
      // }
      console.log(volcanoNameInput);
    }
  };
  //____________________________________________________________________________________________________________________//
  const saveData = () => {
    // console.log(processed);
    processed.forEach((item) => {
      console.log(item.json);
      console.log(item.json.volcano);
      let orientation_upload = 'none';
      if (item.json.orientation) {
        orientation_upload = item.json.orientation;
      }
      const crystal_upload = {
        'crystal name': item.json['crystal name'],
        'type traverse': item.json['type traverse'],
        axis: item.json.axis,
        orientation: orientation_upload,
        mineral: item.json.mineral,

        volcano: item.json.volcano,
        eruption: item.json.eruption,
        DOI: item.json.DOI,
        reference: item.json.reference,
        traverses: { ...item.json.traverse },
      };

      try {
        axios.post('/crystal/upload', crystal_upload);
        // console.log(crystal_upload);
      } catch (e) {
        console.error(e);
      }
    });
    setSubmitted(1);
    // processed.forEach((item) => {
    //   DataUploadAPI.uploadData(item.json);
    //   console.log(item.json);
    // });
  };

  //   const [state, setState] = React.useState({
  //     checkedA: true,
  //     checkedB: false,
  //     checkedC: false,
  //     checkedD: false,
  //   });
  const [submitted, setSubmitted] = React.useState(0);
  const [clicked, setClicked] = React.useState(0);
  const [crystalNameInput, setCrystalName] = React.useState('');
  const [mineralNameInput, setMineralNameInput] = React.useState('');
  const [volcanoNameInput, setVolcanoNameInput] = React.useState('');
  const [eruptionYearInput, setEruptionYearInput] = React.useState('');
  const [referenceInput, setReferenceInput] = React.useState('');
  const [typeTraverse, setType] = React.useState('');
  const [authorInput, setAuthor] = React.useState('');
  //   const [reference, setReference] = React.useState('');
  const [researchTitle, setResearchTitle] = React.useState('');
  const [doiInput, setDOI] = React.useState('');
  const formRef = React.useRef(null);
  //   const handleCheckBoxChange = (event: any) => {
  //     setState({ ...state, [event.target.name]: event.target.checked });
  //   };

  const handleClicked = async () => {
    const outstandingFirst = outstanding[0];
    const processedResult = await outstandingFirst.result; // mo
    // need to modify processedResult
    // the current problem is the default value displayed is slower than current file.
    // console.log(processedResult?.result.json);
    if (processedResult) {
      //   setCrystalName;

      // Set state from the value in file. I intended to use the state for the value.
      await setMineralNameInput(processedResult.result.json.mineral);
      await setType(processedResult.result.json['type traverse']);
      await setCrystalName(processedResult.result.json['crystal name']);
      await setVolcanoNameInput(processedResult.result.json.volcano);
      await setEruptionYearInput(processedResult.result.json.eruption);
      await setReferenceInput(processedResult.result.json.reference);
      await setType(processedResult.result.json['type traverse']);
    }
    setClicked(1);
  };
  const handleChange = (event: any) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'crystalNameInput') {
      // setJsonData({ ...jsonData, 'crystal name': value });
      setCrystalName(value);
    } else if (name === 'typeTraverse') {
      // setJsonData({ ...jsonData, 'type traverse': value });
      setType(value);
    } else if (name === 'mineralNameInput') {
      // setJsonData({ ...jsonData, mineral: value });
      setMineralNameInput(value);
    } else if (name === 'volcanoNameInput') {
      // setJsonData({ ...jsonData, volcano: value });
      setVolcanoNameInput(value);
    } else if (name === 'eruptionYearInput') {
      // setJsonData({ ...jsonData, eruption: value });
      setEruptionYearInput(value);
    } else if (name === 'referenceInput') {
      // setJsonData({ ...jsonData, reference: value });
      setReferenceInput(value);
    } else if (name === 'researchTitle') {
      // setJsonData({ ...jsonData, author: value });
      setResearchTitle(value);
    } else if (name === 'doiInput') {
      // setJsonData({ ...jsonData, doi: value });
      setDOI(value);
    }
  };

  // console.log(outstanding);

  //____________________________________________________________________________________________________________________//

  return (
    <Paper className={classes.paper}>
      <FadeIn>
        <Typography component='h1' variant='h5' align='center'>
          New Crystal Data
        </Typography>
        {currentUser ? (
          <div style={{ position: 'relative' }}>
            <div
              style={
                uploaded <= 0 || clicked == 0
                  ? { display: 'block' }
                  : { display: 'none' }
              }
            >
              <Box className={classes.spacing} display='flex'>
                <Button variant='contained' component='label'>
                  Choose File(s)
                  <input
                    type='file'
                    onChange={onInputChange}
                    id='files'
                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                    hidden
                    multiple
                  />
                </Button>
              </Box>
              <div style={{ marginLeft: 10, marginTop: 20 }}>
                {outstanding.length == 0 ? (
                  <Typography>
                    *You can choose one or multiple files. Only Excel files
                    (.xls, .xlsx) are allowed. Please see{' '}
                    <a
                      href='https://source.wovodat.org/static/data-template.xlsx'
                      //href='../assets/data-template.xlsx'
                      download='data-template.xlsx'
                    >
                      data template and guides
                    </a>
                    .
                    <br />
                    <a
                      href='https://source.wovodat.org/static/Etna_2015-2016_ol_Cannata2018_6.xlsx'
                      // href='../assets/Etna_2015-2016_ol_Cannata2018_6.xlsx'
                      download='Etna_2015-2016_ol_Cannata2018_6.xlsx'
                    >
                      Example file 1
                    </a>
                    <br />
                    <a
                      href='https://source.wovodat.org/static/Kilauea_1959_ol_Fabbrizio2019_2_(only axis).xlsx'
                      // href='../../assets/Kilauea_1959_ol_Fabbrizio2019_2_(only axis).xlsx'
                      download='Kilauea_1959_ol_Fabbrizio2019_2_(only axis).xlsx'
                    >
                      Example file 2
                    </a>
                  </Typography>
                ) : (
                  <Typography>
                    {outstanding.length} files uploaded successfully.
                    <Typography>
                      Please click "Next" button to modify (if necessary) and
                      upload data.
                    </Typography>
                  </Typography>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginRight: 10,
                }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleClicked}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Typography component='h3'>
              To contribute new crystal data, please <a href='/login'>log in</a>{' '}
              first.
            </Typography>
          </div>
        )}
        <React.Fragment>
          {/* {clicked == 0 && ( */}

          {/* )} */}

          {uploaded > 0 && outstanding[0] && clicked == 1 && (
            <div>
              {!outstanding[0].result && (
                <div>
                  <LinearProgress />
                </div>
              )}
              {outstanding[0].result && (
                <div style={{ marginTop: 25 }}>
                  {/* // TODO: add form data */}
                  <div>
                    <Box display='flex'>
                      <Grid container spacing={1}>
                        <Grid item sm>
                          <FormGroup /* className= {classes.formLabel}*/>
                            <FormControl style={{ marginBottom: 20 }}>
                              <InputLabel shrink={true}>
                                Crystal Name
                              </InputLabel>
                              <TextField
                                onChange={handleChange}
                                name='crystalNameInput'
                                margin='normal'
                                // id='crystal-name'
                                value={crystalNameInput}
                              ></TextField>
                            </FormControl>
                            <FormControl>
                              <InputLabel shrink={true}>
                                Mineral Name
                              </InputLabel>
                              <TextField
                                onChange={handleChange}
                                name='mineralNameInput'
                                margin='normal'
                                // id='crystal-name'
                                //   label='Mineral name'
                                value={mineralNameInput}
                              ></TextField>
                            </FormControl>
                            {/* <FormControl style={{ marginBottom: 20 }}>
                            <InputLabel>Mineral Name</InputLabel>
                            <NativeSelect
                              name='mineralNameInput'
                              onChange={handleChange}
                            >
                              <option value='Plagioclase'>Plagioclase</option>
                              <option value='Olivine'>Olivine</option>
                              <option value='Anorthoclase'>Anorthoclase</option>
                            </NativeSelect>
                          </FormControl> */}
                            <FormControl style={{ marginTop: 20 }}>
                              <InputLabel shrink={true}>
                                Volcano Name
                              </InputLabel>
                              <TextField
                                onChange={handleChange}
                                name='volcanoNameInput'
                                margin='normal'
                                // id='crystal-name'
                                value={volcanoNameInput}
                              ></TextField>
                            </FormControl>

                            <FormControl style={{ marginTop: 20 }}>
                              <InputLabel shrink={true}>
                                Type Traverse
                              </InputLabel>
                              <TextField
                                onChange={handleChange}
                                name='typeTraverse'
                                margin='normal'
                                // id='crystal-name'
                                value={typeTraverse}
                              ></TextField>
                            </FormControl>
                          </FormGroup>
                        </Grid>

                        <Grid item sm className={classes.grid2}>
                          <FormGroup>
                            <FormControl style={{ marginBottom: 19 }}>
                              <InputLabel shrink={true}>
                                Eruption Year
                              </InputLabel>
                              <TextField
                                onChange={handleChange}
                                name='eruptionYearInput'
                                margin='normal'
                                // id='crystal-name'
                                value={eruptionYearInput}
                              ></TextField>
                            </FormControl>
                            <FormControl style={{ marginBottom: 8 }}>
                              <InputLabel shrink={true}>Reference</InputLabel>
                              <TextField
                                onChange={handleChange}
                                name='referenceInput'
                                fullWidth
                                margin='normal'
                                // id='author-name'
                                value={referenceInput}
                              ></TextField>
                            </FormControl>

                            <TextField
                              onChange={handleChange}
                              name='researchTitle'
                              fullWidth
                              margin='normal'
                              // id='crystal-name'
                              label='Research Title'
                              value={researchTitle}
                            ></TextField>
                            <TextField
                              onChange={handleChange}
                              name='doiInput'
                              fullWidth
                              margin='normal'
                              // id='doi'
                              label='Digital Object Identifier'
                              value={doiInput}
                            ></TextField>
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                </div>
              )}
              <div className={classes.buttons}>
                {/* <Button
                  variant='contained'
                  color='secondary'
                  className={classes.button}
                  onClick={removeCurrent}
                >
                  Delete
                </Button> */}
                <Button
                  variant='contained'
                  color='secondary'
                  className={classes.button}
                  onClick={nextData}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {uploaded > 0 && !outstanding[0] && submitted == 0 && (
            <div>
              <div>Saving {processed.length} files?</div>
              <div className={classes.buttons}>
                {/* // TODO: change saveData */}
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  onClick={saveData}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
          {submitted == 1 && (
            <div>
              <br />
              <div style={{ fontSize: '17px' }}>
                {/* <h3> */}
                Thank you for your contribution. Do you want to upload more
                data?
                <br />
                {/* </h3> */}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <div className={classes.buttons} style={{ marginRight: 10 }}>
                  {/* // TODO: change saveData */}
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    onClick={() => window.location.reload()}
                  >
                    Upload more data
                  </Button>
                </div>
                <div className={classes.buttons}>
                  {/* // TODO: change saveData */}
                  <Button
                    variant='contained'
                    color='secondary'
                    className={classes.button}
                    onClick={() => handleOnClick('/home')}
                  >
                    Go to home page
                  </Button>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      </FadeIn>
    </Paper>
  );
}

const queueReducer = (
  queue: Queue,
  message:
    | UploadMessage
    | ProcessingMessage
    | ProcessedMessage
    | PopMessage
    | ClearMessage
): Queue => {
  // All of this below is going to return a Queue.
  switch (message.type) {
    case 'upload':
      return {
        processed: queue.processed,
        outstanding: [...queue.outstanding, ...message.files],
      }; // add not uploaded yet files to outstanding queue
    case 'processing': // Processing `outstanding` head. Refresh
      return {
        processed: queue.processed,
        outstanding: [...queue.outstanding],
      };
    case 'processed':
      if (queue.outstanding[0].file === message.file)
        //if the file is being processed is at the top of the queue, return queue.processed

        return {
          processed: [...queue.processed, message.result],
          outstanding: queue.outstanding.slice(1),
        }; // after processed, add fileName and json of file uploaded to processed queue. Also delete the top outstanding file
      return queue; // Not in the list, ignored
    case 'pop':
      return {
        processed: queue.processed.slice(1),
        outstanding: queue.outstanding,
      }; // delete one file.
    case 'clear':
      return { processed: [], outstanding: [] }; // empty both queue.
  }
};

function processEntry(entry: OutstandingEntry) {
  if (entry.result) return;

  const { file, fileName } = entry;
  console.log(fileName);
  entry.result = excelToJson(entry.file).then((json) => {
    return { file, result: { fileName, json } };
  });
}

type ProcessedEntry = {
  fileName: string;
  json: any;
};
type OutstandingEntry = {
  file: File;
  fileName: string;
  result?: Promise<{ file: File; result: ProcessedEntry }>;
};
type Queue = { processed: ProcessedEntry[]; outstanding: OutstandingEntry[] }; // file list of outstanding entry and processed entry
type UploadMessage = { type: 'upload'; files: OutstandingEntry[] }; // initial state of case upload is outstanding entry is an array = above
type ProcessingMessage = { type: 'processing' };
type ProcessedMessage = {
  type: 'processed';
  file: File;
  result: ProcessedEntry;
};
type PopMessage = { type: 'pop' };
type ClearMessage = { type: 'clear' };

// type MongoDBJson = {
// 	crystal: string,
// 	type: string,
// 	axis: string,
// 	orientation: string,
// 	mineral: string,
// 	volcano: string,
// 	eruption: string,
// 	reference: string,
// 	//author: string,
// 	//doi: string,
// 	traverse: Traverse[],
// }

// type Traverse = {
// 	sio2: string
// }
