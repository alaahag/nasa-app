import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import Grid from '@material-ui/core/Grid';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

export default function Favorites() {
    const [data, setData] = useState([]),
    [isLoading, setLoading] = useState(true);

    const fetchData = async() => {
        try {
            const dData = await axios.get('/api/images');
            setData(dData.data);
        }
        catch {
            console.log("Failed connecting to the server.");
        }

        setLoading(false);
    }

    useEffect(() => { fetchData(); }, []);

    return (
        <Grid container direction="row" justify="center" alignItems="center">
        {
            isLoading ? <LoadingSpinner />
            : data.length === 0 ? <h2>No results found!</h2>
            : data.map(m => <CardView key={m._id} data={m} />)
        }
        </Grid>
    )
}