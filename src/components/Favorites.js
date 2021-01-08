import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import Grid from '@material-ui/core/Grid';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import utils from '../utils';
import SnackBar from './SnackBar';

export default function Favorites() {
    const [data, setData] = useState([]),
    [isLoading, setLoading] = useState(true),
    [snack, setSnack] = useState({ message: "", severity: "" });

    const fetchData = async() => {
        try {
            const dData = await axios.get(`${utils.API_PATH}/images`);
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
                : data.map(m => <CardView key={m._id} data={m} />)
            }
            <SnackBar message={snack.message} severity={snack.severity} />
        </Grid>
    )
}