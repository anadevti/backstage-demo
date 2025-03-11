import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  icon: {
    height: 50,
    width: 'auto',
  },
});

const LogoIcon = () => {
  const classes = useStyles();

  return (
    <img
      src="https://bakalova.ink/wp-content/uploads/2016/09/gopher-girl.png"
      alt="Logo Icon"
      className={classes.icon}
    />
  );
};

export default LogoIcon;