import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import CardView from './CardView';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import SnackBar from './SnackBar';
import { API_PATH, SNACKBAR_PROPS }  from '../Constants';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    back: {
        color: 'white',
        marginBottom: theme.spacing(2)
    },
    center: {
        textAlign: 'center'
    }
}));

export default function Favorite(props) {
    const [data, setData] = useState([]),
    classes = useStyles(),
    [isLoading, setLoading] = useState(true),
    [snack, setSnack] = useState({ message: "", severity: "" });

    useEffect(() => {
        const fetchData = async() => {
            try {
                const id = props.match.params.id
                const dData = await axios.get(`${API_PATH}/image/${id}`);
                setData(dData.data);
            }
            catch {
                setSnack({ message: SNACKBAR_PROPS.MessageType.FAILED_GETTING, severity: SNACKBAR_PROPS.SeverityType.ERROR });
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [props.match.params.id]);

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            {
                isLoading ? <LoadingSpinner />
                : data.length === 0 ? <h2>No results found!</h2>
                : <div className={classes.center}>
                    <CardView key="1" data={data} />
                    <Link to="/favorites" className={classes.back}>
                        <IconButton title="Back to favorites" color="inherit" aria-label="back">
                            <ThreeSixtyIcon />
                        </IconButton>
                    </Link>
                </div>
            }
            <SnackBar message={snack.message} severity={snack.severity} />
        </Grid>
    )
}