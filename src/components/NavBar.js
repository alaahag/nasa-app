import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Links from './Links';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiPaper-root": {
			backgroundColor: "#2a4251 !important",
			boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
		},
        flexGrow: 1
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        },
        fontWeight: "bold"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: '1em',
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            }
        }
    }
}));

export default function NavBar() {
    const classes = useStyles(),
    history = useHistory();
    let searchText = "";

    const validatePressEnter = (e) => {
        e.preventDefault();
        if (e.target.type === "text")
            searchText = e.target.value;

        if (e.key === "Enter" || e.target.type !== "text")
            history.push(`/search?q=${searchText}`);
    }

    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Link to="/" className={classes.inputRoot}>
                    <IconButton edge="start" color="inherit">
                        <img src="nasa.png" className="App-logo" alt="Logo" />
                    </IconButton>
                </Link>
                <Typography className={classes.title} variant="h6" noWrap>
                    NASA-App
                </Typography>
                <Links />
                <div className={classes.search}>
                    <InputBase onKeyUp={validatePressEnter} id="txtSearch" placeholder="Search…" classes={{root: classes.inputRoot, input: classes.inputInput}} inputProps={{ 'aria-label': 'search' }}/>
                </div>
                <Link to="#" onClick={validatePressEnter} className={classes.inputRoot}>
                    <IconButton title="Search" edge="end" color="inherit" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Link>
            </Toolbar>
        </AppBar>
    </div>
    );
}