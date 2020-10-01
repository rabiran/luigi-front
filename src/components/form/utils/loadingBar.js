import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  loadingCircle: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    margin: '0 auto',
    marginTop: '20px',
    width: '50%'
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.loadingCircle}>
      <CircularProgress />
    </div>
  );
}