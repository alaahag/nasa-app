import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CardView from './CardView';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import SnackBar from './SnackBar';
const utils = require('../utils');

export default function Favorite(props) {
    const [data, setData] = useState([]),
    [isLoading, setLoading] = useState(true),
    [snack, setSnack] = useState({ message: "", severity: "" });

    const fetchData = async() => {
        try {
            const id = props.match.params.id
            const dData = await axios.get(`${utils.API_PATH}/image/${id}`);
            setData(dData.data);
        }
        catch {
            setSnack({ message: utils.SnackBarProps.MessageType.CONNECTION_ERROR, severity: utils.SnackBarProps.SeverityType.ERROR });
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchData(); }, []);

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            {
                isLoading ? <LoadingSpinner />
                : data.length === 0 ? <h2>No results found!</h2>
                : <CardView key="1" data={data} />
            }
            <SnackBar message={snack.message} severity={snack.severity} />
        </Grid>
    )
}