import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  fullLogo: {
    height: 100,
    width: 'auto',
  },
});

const LogoFull = () => {
  const classes = useStyles();

  return (
    <img
      src="https://raw.githubusercontent.com/egonelbre/gophers/63b1f5a9f334f9e23735c6e09ac003479ffe5df5/vector/science/scientist.svg"
      alt="Logo Full"
      className={classes.fullLogo}
    />
  );
};

export default LogoFull;
