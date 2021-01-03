import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import Grid from '@material-ui/core/Grid';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import utils from '../utils';

export default function Favorites() {
    const [data, setData] = useState([]),
    [isLoading, setLoading] = useState(true);

    const fetchData = async() => {
        const dData = await axios.get(`${utils.FULL_URL}/images`);
        setData(dData.data);
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