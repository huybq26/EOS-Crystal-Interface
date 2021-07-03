import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3.5),
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
  textDescription: {
    marginTop: theme.spacing(2),
    fontSize: 16,
  },
  //   input: {
  //     textAlign: 'right',
  //     // marginRight: 'auto',
  //   },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  searchBar: {
    fontSize: 0.5,
    color: 'white',
  },
  submitButton: {
    position: 'absolute',
    marginLeft: '50%',
  },
  tableContainer: {
    maxHeight: 500,
  },
  booleanContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 80,
    marginTop: 25,
  },
  optionText: {
    fontWeight: 'bold',
  },
  typeOptions: {
    display: 'flex',
    flexDirection: 'row',
  },
  options: {
    marginLeft: 20,
    marginTop: -5,
  },
}));
