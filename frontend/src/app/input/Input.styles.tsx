import { makeStyles } from '@material-ui/core/styles';

export const InputStyles = makeStyles((theme) => ({
  formtitle: {
    width: 'auto',
    // marginTop: theme.spacing(3),
    // marginLeft: theme.spacing(3),
    fontSize: '24px',
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

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
  spacing_another: {
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
