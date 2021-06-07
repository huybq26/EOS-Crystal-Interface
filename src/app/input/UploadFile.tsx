import React, { ChangeEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { excelToJson } from '../../utils/ExcelToJson';
import { isConstructorDeclaration } from 'typescript';

const useStyles = makeStyles({
  fileName: {
    marginLeft: '10px',
    alignSelf: 'center',
    textOverflow: 'ellipsis',
    marginTop: '10px',
  },
  spacing: {
    margin: '5px',
    marginTop: '20px',
  },
  preview: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    maxWidth: '800px',
  },
});

type UploadFileProps = {
  step: number;
  activeStep: number;
  // excelFile: File | null;
  // excelFile1: File | null;
  excelFileList: FileList | null;
  // numOfFiles: number;
  // excelFileChange: (excelFile: File | null) => any;
  // excelFileChange1: (excelFile1: File | null) => any;
  excelFileChangeList: (excelFileList: FileList | null) => any;
};

export default function UploadFile(props: UploadFileProps) {
  const classes = useStyles();
  const { step, activeStep, excelFileList } = props;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      props.excelFileChangeList(files);
    }

    //console.log(e.target.files.length);
    // if (e.target.files && e.target.files[0] != null) {
    //   console.log(e.target.files[0]);
    // }

    // if (e.target.files && e.target.files[0] != null) {
    //   props.excelFileChange(e.target.files[0]);
    // }
  };
  // console.log(excelFile);

  return (
    <div
      style={activeStep === step ? { display: 'block' } : { display: 'none' }}
    >
      <Box className={classes.spacing} display='flex'>
        <Button variant='contained' component='label'>
          Choose File(s)
          <input
            onChange={handleFileChange}
            id='files'
            type='file'
            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            hidden
            multiple
          />
        </Button>
        {/* <p>Selected files:</p> */}
        {/* 
        <Typography className={classes.fileName} component={'p'}>
          {excelFile != null ? excelFile.name : ''}
        </Typography> */}
      </Box>
      <Typography className={classes.fileName} component={'p'}>
        {excelFileList != null ? (
          // excelFile.name
          <Typography>
            List of file names to insert
          </Typography>
        ) : (
          <Typography>
            *You can choose one or multiple files. Only Excel files (.xls,
            .xlsx) are allowed. Please see{' '}
            <a href='https://petro.wovodat.org/assets/excels/Sample_Template_New_v3.xlsx'>
              example file
            </a>
            .
          </Typography>
        )}
      </Typography>
    </div>
  );
}
