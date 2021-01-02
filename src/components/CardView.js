import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReactPlayer from 'react-player/youtube'
import { useLocation, Link } from "react-router-dom";
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import SnackBar from './SnackBar';
import axios from 'axios';
import utils from '../utils';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiPaper-root": {
            backgroundColor: "#2a4251 !important",
            boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
        }
    },
    full_image: {
        width: 340,
        height: 410,
        color: 'white',
        float: 'left',
        margin: 12,
        borderRadius: 10
    },
    like: {
        position: 'relative',
        float: 'left',
        top: 25,
        left: 3,
        width: 40,
        height: 40,
        boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
    },
    media: {
        width: 340,
        height: 'calc(100% - 96px)',
        backgroundSize: '100% 100%'
    },
    full_media: {
        width: '100%',
        height: 480,
        backgroundSize: '100% 100%'
    },
    header: {
        height: 64,
        margin: 0,
        maxHeight: 64,
        overflowY: 'auto',
        textJustify: 'inter-word',
        wordBreak: 'break-word',
        textAlign: "center",
        paddingTop: 16,
        paddingBottom: 16,
        marginLeft: 1,
        marginRight: 1
    },
    full_player: {
        maxWidth: 640,
        color: 'white',
        margin: 12
    },
    full_text: {
        color: 'white',
        float: 'left',
        textAlign: 'justify',
        textJustify: 'inter-word',
        wordBreak: 'break-word',
        margin: 20,
        fontSize: '20px'
    },
    back: {
        color: 'white',
        display: 'block',
        textAlign: 'center',
        marginBottom: 2
    }
}));

export default function CardView(props) {
    const classes = useStyles(),
    [snack, setSnack] = useState({ message: "", severity: "" }),
    [isDisposed, setDispose] = useState(false),
    [isHiddenLike, setHideLike] = useState(false),
    location = useLocation(),
    isLocationHome = location.pathname === '/',
    isLocationFavorites = location.pathname === '/favorites',
    isLocationFavorite = location.pathname.includes('/favorite/'),
    severityType = {
        ERROR: 'error',
        WARNING: 'warning',
        INFO: 'info',
        SUCCESS: 'success'
    }

    const saveToDB = async (data) => {
        await axios.post(`${utils.DEVELOPMENT_URL}/image`, data);
        setSnack({ message: "Selected data has been saved successfully!", severity: severityType.SUCCESS });
    }

    const removeFromDB = async (id) => {
        await axios.delete(`${utils.DEVELOPMENT_URL}/image/${id}`);
        setSnack({ message: "Selected data has been removed successfully!", severity: severityType.SUCCESS });
    }

    const handleLikes = (e) => {
        if (isLocationFavorite || isLocationFavorites) {
            //remove from DB
            removeFromDB(props.data._id);
            setDispose(true);
        }
        else {
            //save to DB
            saveToDB({ title: props.data.title, url: props.data.url, explanation: props.data.explanation ? props.data.explanation : ""});
            setHideLike(true);
        }
    }

    const handleFavClick = (e) => {
        if (!isLocationFavorites)
            e.preventDefault();
    }

    return (
			<div>
				{isDisposed ? null : (
					<div className={classes.root}>
						<Card className={isLocationHome || isLocationFavorite ? classes.full_player : classes.full_image }>
							{!isLocationHome && !isHiddenLike ? (
								<IconButton
									className={classes.like}
									style={{ color: isLocationFavorite || isLocationFavorites ? "#7fd268" : "white" }}
									onClick={handleLikes} title="Favorite"
								>
									<FavoriteIcon />
								</IconButton>
							) : null}
							<CardHeader
								titleTypographyProps={{ variant: isLocationHome || isLocationFavorite ? "h5" : "h6" }}
								className={classes.header} title={props.data.title}
							/>
							{props.data.media_type === "video" ? (
								<ReactPlayer url={props.data.url} />
							) : (
								<Link onClick={handleFavClick} to={props.data._id ? `/favorite/${props.data._id}` : "#"}>
									<CardMedia
										style={{cursor: isLocationFavorites ? "pointer" : "default"}}
										className={isLocationHome || isLocationFavorite ? classes.full_media : classes.media}
										image={props.data.url} alt="img"
									/>
								</Link>
							)}
							<div className={classes.full_text}>{props.data.explanation}</div>
							{isLocationFavorite ? (
								<Link to="/favorites" className={classes.back}>
									<IconButton title="Back to favorites" color="inherit" aria-label="back">
										<ThreeSixtyIcon />
									</IconButton>
								</Link>
							) : null}
						</Card>
					</div>
				)}
				<SnackBar message={snack.message} severity={snack.severity} />
			</div>
		);
}
