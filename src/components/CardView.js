import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReactPlayer from 'react-player/youtube'
import {useLocation} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
        height: 350,
        color: 'white',
        float: 'left',
        margin: 15,
        borderRadius: 10
    },
    like: {
        position: 'relative',
        float: 'left',
        top: 5,
        left: 6,
        boxShadow: '1px 2px 3px grey'
    },
    media: {
        width: 400,
        height: '100%'
    },
    fullmedia: {
        width: '100%',
        height: '50vh'
    },
    header: {
        height: 50,
        margin: 0
    },
    fullplayer: {
        width: 640,
        color: 'white',
        fontSize: '90%',
        margin: 15
    },
    fulltext: {
        color: 'white',
        float: 'left',
        textAlign: 'justify',
        textJustify: 'inter-word',
        wordBreak: 'break-word',
        margin: 20
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CardView(props) {
    const [open, setOpen] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState('');
    const [snackSeverity, setSnackSeverity] = React.useState('');

    const handleSnackbarClick = (message, severity) => {
        setSnackMessage(message);
        setSnackSeverity(severity);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;

        setOpen(false);
    };

    const classes = useStyles();
    const location = useLocation();

    const saveToDB = async (data) => {
        await axios.post("http://localhost:3001/image", data);
        handleSnackbarClick("Selected data has been saved successfully!", "success");
    }

    const removeFromDB = async (id) => {
        await axios.delete(`http://localhost:3001/image/${id}`);
        handleSnackbarClick("Selected data has been removed successfully!", "success");
    }

    const handleLikes = (e) => {
        if (location.pathname.includes('/favorite'))
            //remove from DB
            removeFromDB(props.data._id);
        else {
            //save to DB
            saveToDB({ title: props.data.title, url: props.data.url, explanation: props.data.explanation ? props.data.explanation : ""});
            e.target.style.display = "none";
        }
    }

    const handleFavClick = (e) => {
        if (location.pathname !== '/favorites')
            e.preventDefault();
    }

    return (
        <Card className={location.pathname === '/' || location.pathname.includes('/favorite/') ? classes.fullplayer : classes.root}>
            {location.pathname !== '/' ? <IconButton aria-label="add to favorites" className={classes.like} style={{color: location.pathname.includes('/favorite') ? '#7fd268' : 'white'}}  onClick={handleLikes}><FavoriteIcon /></IconButton> : ""}
            <CardHeader className={classes.header} title={props.data.title}/>
            {props.data.media_type === "video" ? <ReactPlayer url={props.data.url} /> : <Link onClick={handleFavClick} to={props.data._id ? `/favorite/${props.data._id}` : ""}> <CardMedia style={{cursor: location.pathname === '/favorites' ? 'pointer' : 'default'}} className={location.pathname.includes('/favorite/') ? classes.fullmedia : classes.media} image={props.data.url} title="NASA"/> </Link> }
            <div className={classes.fulltext}>{props.data.explanation}</div>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackSeverity}>
                    {/* <Alert severity="success"  / "error" /> "warning" / "info" */}
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
}
