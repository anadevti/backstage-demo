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
      src="https://bakalova.ink/wp-content/uploads/2016/09/gopher-girl.png"
      alt="Logo Full"
      className={classes.fullLogo}
    />
  );
};

export default LogoFull;
