import React, { ChangeEvent, useState, useRef } from 'react';
import {
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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacing: {
    margin: '5px',
  },
  crystalType: {
    marginTop: theme.spacing(5),
  },
  grid2: {
    // marginLeft: theme.spacing(1)
  },
  gridBtn: {
    marginTop: theme.spacing(3),
  },
  chooseFiles: {},
  submitBtn: {
    // marginLeft: theme.spacing(30)
  },
}));

type ConfirmDataProps = {
  step: number;
  activeStep: number;
  jsonData: any;
  setJsonData: (newInput: any) => any;
};

export default function ConfirmData(props: ConfirmDataProps) {
  const { step, activeStep, jsonData } = props;

  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedC: false,
  });
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

  const handleChange = (event: any) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'crystalNameInput') {
      props.setJsonData({ ...jsonData, 'crystal name': value });
      setCrystalName(value);
    } else if (name === 'typeTraverse') {
      props.setJsonData({ ...jsonData, 'type traverse': value });
      setType(value);
    } else if (name === 'mineralNameInput') {
      props.setJsonData({ ...jsonData, mineral: value });
      setMineralNameInput(value);
    } else if (name === 'volcanoNameInput') {
      props.setJsonData({ ...jsonData, volcano: value });
      setVolcanoNameInput(value);
    } else if (name === 'eruptionYearInput') {
      props.setJsonData({ ...jsonData, eruption: value });
      setEruptionYearInput(value);
    } else if (name === 'referenceInput') {
      props.setJsonData({ ...jsonData, reference: value });
      setReferenceInput(value);
    } else if (name === 'authorInput') {
      props.setJsonData({ ...jsonData, author: value });
      setAuthor(value);
    } else if (name === 'doiInput') {
      props.setJsonData({ ...jsonData, doi: value });
      setDOI(value);
    }
  };

  const handleCheckBoxChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div
      style={activeStep === step ? { display: 'block' } : { display: 'none' }}
    >
      <Box className={classes.spacing} display='flex'>
        <Grid container spacing={1}>
          <Grid item sm>
            <FormGroup /* className= {classes.formLabel}*/>
              <FormControl style={{ marginBottom: 20 }}>
                <InputLabel shrink={true}>Crystal Name</InputLabel>
                <TextField
                  onChange={handleChange}
                  name='crystalNameInput'
                  margin='normal'
                  // id='crystal-name'
                  value={jsonData['crystal name']}
                ></TextField>
              </FormControl>
              {/* <TextField
                onChange={handleChange}
                name='mineralNameInput'
                margin='normal'
                // id='crystal-name'
                //   label='Mineral name'
                helperText='Mineral name'
                value={jsonData['mineral']}
              ></TextField> */}
              <FormControl style={{ marginBottom: 20 }}>
                <InputLabel>Mineral Name</InputLabel>
                <NativeSelect name='mineralNameInput' onChange={handleChange}>
                  <option value='Plagioclase'>Plagioclase</option>
                  <option value='Olivine'>Olivine</option>
                  <option value='Anorthoclase'>Anorthoclase</option>
                </NativeSelect>
              </FormControl>
              <FormControl style={{ marginTop: 10 }}>
                <InputLabel shrink={true}>Volcano Name</InputLabel>
                <TextField
                  onChange={handleChange}
                  name='volcanoNameInput'
                  margin='normal'
                  // id='crystal-name'
                  value={jsonData['volcano']}
                ></TextField>
              </FormControl>

              <Typography className={classes.crystalType}>
                Type traverse
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedA}
                    onChange={handleCheckBoxChange}
                    name='checkedA'
                    color='primary'
                  />
                }
                label='R-to-R'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleCheckBoxChange}
                    name='checkedB'
                    color='primary'
                  />
                }
                label='R-to-C'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedC}
                    onChange={handleCheckBoxChange}
                    name='checkedC'
                    color='primary'
                  />
                }
                label='C-to-C'
              />
            </FormGroup>
          </Grid>

          <Grid item sm className={classes.grid2}>
            <FormGroup>
              <FormControl style={{ marginBottom: 20 }}>
                <InputLabel shrink={true}>Eruption Year</InputLabel>
                <TextField
                  onChange={handleChange}
                  name='eruptionYearInput'
                  margin='normal'
                  // id='crystal-name'
                  value={jsonData['eruption']}
                ></TextField>
              </FormControl>
              <FormControl style={{ marginBottom: 6 }}>
                <InputLabel shrink={true}>Reference</InputLabel>
                <TextField
                  onChange={handleChange}
                  name='referenceInput'
                  fullWidth
                  margin='normal'
                  // id='author-name'
                  value={jsonData['reference']}
                ></TextField>
              </FormControl>

              <TextField
                onChange={handleChange}
                name='researchTitle'
                fullWidth
                margin='normal'
                // id='crystal-name'
                label='Research Title'
              ></TextField>
              <TextField
                onChange={handleChange}
                name='doiInput'
                fullWidth
                margin='normal'
                // id='doi'
                label='Digital Object Identifier'
              ></TextField>
            </FormGroup>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
