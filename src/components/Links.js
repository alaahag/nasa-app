import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  links: {
    marginRight: theme.spacing(2),
    color: 'white'
  },
  link: {
    display: 'flex',
    color: 'white',
    textDecoration: 'none'
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  }
}));

function handleClick(event) {
  event.currentTarget.className = "activeLink";
}

function handleBlur(event) {
  event.currentTarget.className = "notActiveLink";
}

export default function Links() {
  const classes = useStyles();

  return (
    <Breadcrumbs separator="&nbsp;&nbsp;" aria-label="breadcrumb" className={classes.links}>
      <Link to="/" onBlur={handleBlur} onClick={handleClick} className={`${classes.link}`}>
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      <Link to="/favorites" onBlur={handleBlur} onClick={handleClick} className={`${classes.link}`}>
        <FavoriteIcon className={classes.icon} />
        Favorites
      </Link>
    </Breadcrumbs>
  );
}
