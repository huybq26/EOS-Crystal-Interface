import React, { ChangeEvent } from 'react';
import {
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { InputStyles } from './Input.styles';
import UploadFile from './UploadFile';
import ConfirmData from './ConfirmData';
import { excelToJson } from '../../utils/ExcelToJson';
import Fade from '@material-ui/core/Fade';

const steps = ['Upload File', 'Confirm Data'];

export default function Input() {
  const classes = InputStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const [excelFile, setExcelFile] = React.useState<File | null>(null);
  const [excelFile1, setExcelFile1] = React.useState<File | null>(null);
  const [jsonData, setJsonData] = React.useState<any>({
    'crystal name': '',
    'type traverse': '',
    axis: '',
    orientation: '',
    mineral: '',
    volcano: '',
    eruption: '',
    reference: '',
    //author: '',
    //doi: '',
    traverse: [],
  });

  const [jsonData2, setJsonData2] = React.useState<any>({
    'crystal name': '',
    'type traverse': '',
    axis: '',
    orientation: '',
    mineral: '',
    volcano: '',
    eruption: '',
    reference: '',
    //author: '',
    //doi: '',
    traverse: [],
  });

  const onExcelFileChange = (newFile: File | null): void => {
    setExcelFile(newFile);
    if (newFile) {
      excelToJson(newFile).then((data) => {
        setJsonData({ ...data });
      });
    }
  };

  const onExcelFileChange1 = (newFile: File | null): void => {
    setExcelFile1(newFile);
    if (newFile) {
      excelToJson(newFile).then((data) => {
        setJsonData2({ ...data });
      });
    }
  };

  // const onExcelFileChange = (newFile: File | null): void => {
  //   setExcelFile(newFile);
  //   if (newFile) {
  //     excelToJson(newFile).then((data) => {
  //       setJsonData({ ...data });
  //     });
  //   }
  // };

  const handleNext = (): void => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep(activeStep - 1);
  };

  const disableNext = (): boolean => {
    if (activeStep == 0 && excelFile == null) {
      return true;
    }

    return false;
  };

  return (
    <Paper className={classes.paper}>
      <Typography component='h1' variant='h5' align='center'>
        New Crystal Data
      </Typography>

      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <React.Fragment>
        <div style={{ position: 'relative' }}>
          <UploadFile
            step={0}
            activeStep={activeStep}
            excelFile={excelFile}
            excelFile1={excelFile1}
            excelFileChange={onExcelFileChange}
            excelFileChange1={onExcelFileChange1}
          />
          <ConfirmData
            step={1}
            activeStep={activeStep}
            jsonData={jsonData}
            setJsonData={setJsonData}
          />
          <ConfirmData
            step={2}
            activeStep={activeStep}
            jsonData={jsonData2}
            setJsonData={setJsonData2}
          />
        </div>
        <div className={classes.buttons}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} className={classes.button}>
              Back
            </Button>
          )}
          <Button
            variant='contained'
            color='primary'
            onClick={handleNext}
            className={classes.button}
            disabled={disableNext()}
          >
            {activeStep === steps.length - 1 ? 'Save' : 'Next'}
          </Button>
        </div>
      </React.Fragment>
    </Paper>
  );
}
