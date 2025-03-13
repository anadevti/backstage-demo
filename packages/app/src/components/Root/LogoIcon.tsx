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
      src="hhttps://raw.githubusercontent.com/egonelbre/gophers/63b1f5a9f334f9e23735c6e09ac003479ffe5df5/vector/science/scientist.svg"
      alt="Logo Icon"
      className={classes.icon}
    />
  );
};

export default LogoIcon;