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
  const [excelFileList, setExcelFileList] =
    React.useState<FileList | null>(null);
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
  let sampleObject = {
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
  };
  const [jsonDataList, setJsonDataList] = React.useState<any>([
    sampleObject,
    sampleObject,
    sampleObject,
    sampleObject,
    sampleObject,
    sampleObject,
    sampleObject,
    sampleObject,
    sampleObject,
    sampleObject,
    sampleObject,
    sampleObject,
    sampleObject,
    sampleObject,
  ]);

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

  const onExcelFileChangeList = async (newFiles: FileList | null) => {
    setExcelFileList(newFiles);
    // setJsonDataList([{}]);
    // console.log('data');
    if (newFiles) {
      // console.log('data');
      // Array.from(newFiles).forEach((file) => {
      console.log('There are', newFiles.length, 'files');
      for (let i = 0; i < newFiles.length; i++) {
        let file = newFiles[i];

        console.log('Processing file ', file.name);
        await excelToJson(file).then((data) => {
          // console.log('data');
          // setJsonDataList((oldArray: any) => [...oldArray, data]);
          // console.log('Previous json array is: ', jsonDataList);
          // setJsonDataList([...jsonDataList, data]);
          jsonDataList.unshift(data);
          // console.log('Subsequent json array is: ', jsonDataList);
          // console.log('Sample Array is:', sampleArray);
          // console.log(jsonDataList);
        });
      }
    }
    // await setJsonDataList([...sampleArray]);
    // console.log(jsonDataList[1]['crystal name']);
    console.log('The desired item is: ', jsonDataList);
  };

  // console.log('Final json array is: ', jsonDataList);

  const handleNext = (): void => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep(activeStep - 1);
  };

  const disableNext = (): boolean => {
    if (activeStep == 0 && excelFileList == null) {
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
            // excelFile={excelFile}
            // excelFile1={excelFile1}
            excelFileList={excelFileList}
            // excelFileChange={onExcelFileChange}
            // excelFileChange1={onExcelFileChange1}
            excelFileChangeList={onExcelFileChangeList}
          />
          <ConfirmData
            step={1}
            setJsonData={setJsonDataList}
            jsonData={jsonDataList[0]}
            activeStep={activeStep}
          />
          <ConfirmData
            step={2}
            setJsonData={setJsonDataList}
            activeStep={activeStep}
            jsonData={jsonDataList[1]}
          />
          <ConfirmData
            step={3}
            setJsonData={setJsonDataList}
            activeStep={activeStep}
            jsonData={jsonDataList[2]}
          />
          {/* <ConfirmData
            step={2}
            activeStep={activeStep}
            jsonData={jsonDataList[1]}
            setJsonData={setJsonDataList}
          /> */}
          {/* <ConfirmData
            step={1}
            activeStep={activeStep}
            jsonData={jsonDataList[0]}
            setJsonData={setJsonDataList}
          />
          // <ConfirmData
          //   step={2}
          //   activeStep={activeStep}
          //   jsonData={jsonDataList[1]}
          //   setJsonData={setJsonDataList}
          // /> */}
          {/* <ConfirmData
            step={1}
            activeStep={activeStep}
            jsonData={jsonDataList[0]}
            setJsonData={setJsonDataList}
          />
          <ConfirmData
            step={2}
            activeStep={activeStep}
            jsonData={jsonDataList[1]}
            setJsonData={setJsonDataList}
          /> */}
          {/* <ConfirmData
            step={3}
            activeStep={activeStep}
            jsonData={jsonDataList[2]}
            setJsonData={setJsonDataList}
          /> */}
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
