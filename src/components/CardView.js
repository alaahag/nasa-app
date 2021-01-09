import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReactPlayer from 'react-player/youtube'
import { useLocation, Link } from "react-router-dom";
import SnackBar from './SnackBar';
import axios from 'axios';
import { SNACKBAR_PROPS }  from '../Constants';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiPaper-root": {
            backgroundColor: "#2a4251 !important",
            boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
        }
    },
    full_image: {
        width: 340,
        height: 320,
        color: 'white',
        float: 'left',
        margin: 12,
        borderRadius: 10
    },
    like: {
        position: 'relative',
        float: 'left',
        top: 25,
        left: 5,
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
        height: 426,
        backgroundSize: '100% 100%'
    },
    header: {
        height: 72,
        margin: 0,
        padding: 12,
        maxHeight: 72,
        overflowY: 'auto',
        textJustify: 'inter-word',
        wordBreak: 'break-word',
        textAlign: "center"
    },
    full_player: {
        maxWidth: 640,
        color: 'white',
        margin: theme.spacing(2)
    },
    full_text: {
        color: 'white',
        float: 'left',
        textAlign: 'justify',
        textJustify: 'inter-word',
        wordBreak: 'break-word',
        margin: theme.spacing(2),
        fontSize: '20px'
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
    isLocationFavorite = location.pathname.includes('/favorite/');

    const saveToDB = async (data) => {
        try {
            await axios.post('/api/image', data);
            setSnack({ message: SNACKBAR_PROPS.MessageType.SUCCESS_SAVED, severity: SNACKBAR_PROPS.SeverityType.SUCCESS });
            return true;
        }
        catch {
            setSnack({ message: SNACKBAR_PROPS.MessageType.FAILED_SAVING, severity: SNACKBAR_PROPS.SeverityType.WARNING });
            return false;
        }
    }

    const removeFromDB = async (id) => {
        try {
            await axios.delete(`/api/image/${id}`);
            setSnack({ message: SNACKBAR_PROPS.MessageType.SUCCESS_REMOVED, severity: SNACKBAR_PROPS.SeverityType.SUCCESS });
            return true;
        }
        catch {
            setSnack({ message: SNACKBAR_PROPS.MessageType.FAILED_DELETING, severity: SNACKBAR_PROPS.SeverityType.WARNING });
            return false;
        }
    }

    const handleLikes = () => {
        if (isLocationFavorite || isLocationFavorites) {
            //remove from DB
            const isOK = removeFromDB(props.data._id);
            if (isOK)
                setDispose(true);
        }
        else {
            //save to DB
            const isOK = saveToDB({ title: props.data.title, url: props.data.url, explanation: props.data.explanation ? props.data.explanation : "" });
            if (isOK)
                setHideLike(true);
        }
    }

    const handleFavClick = (e) => {
        if (!isLocationFavorites)
            e.preventDefault();
    }

    return (
			<div>
				{!isDisposed && (
					<div className={classes.root}>
						<Card className={isLocationHome || isLocationFavorite ? classes.full_player : classes.full_image}>
							{!isLocationHome && !isHiddenLike && (
								<IconButton
									className={classes.like}
									style={{ color: isLocationFavorite || isLocationFavorites ? "#7fd268" : "white" }}
									onClick={handleLikes} title="Favorite"
								>
									<FavoriteIcon />
								</IconButton>
							)}
							<CardHeader
								titleTypographyProps={{ variant: isLocationHome || isLocationFavorite ? "h5" : "h6" }}
								className={classes.header} title={props.data.title}
							/>
							{props.data.media_type === "video" ? (
								<ReactPlayer url={props.data.url} />
							) : (
								<Link onClick={handleFavClick} to={props.data._id ? `/favorite/${props.data._id}` : "#"}>
									<CardMedia
										style={{ cursor: isLocationFavorites ? "pointer" : "default" }}
										className={isLocationHome || isLocationFavorite ? classes.full_media : classes.media}
										image={props.data.url} alt="img"
									/>
								</Link>
							)}
							<div className={classes.full_text}>{props.data.explanation}</div>
						</Card>
					</div>
				)}
				<SnackBar message={snack.message} severity={snack.severity} />
			</div>
		);
}
