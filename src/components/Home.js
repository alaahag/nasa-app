import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import Grid from '@material-ui/core/Grid';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import SnackBar from './SnackBar';
import { API_PATH, SNACKBAR_PROPS }  from '../Constants';

export default function Home(){
    const [data, setData] = useState([]),
    [isLoading, setLoading] = useState(true),
    [snack, setSnack] = useState({ message: "", severity: "" });

    const fetchData = async() => {
        try {
            const dData = await axios.get(`${API_PATH}/APOD`);
            setData(dData.data);
        }
        catch {
            setSnack({ message: SNACKBAR_PROPS.MessageType.CONNECTION_ERROR, severity: SNACKBAR_PROPS.SeverityType.ERROR });
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