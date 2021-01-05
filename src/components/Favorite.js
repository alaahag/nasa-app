import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CardView from './CardView';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import utils from '../utils';

export default function Favorite(props) {
    const [data, setData] = useState([]),
    [isLoading, setLoading] = useState(true);

    const fetchData = async() => {
        const id = props.match.params.id
        const dData = await axios.get(`${utils.FULL_URL}/image/${id}`);
        setData(dData.data);
        setLoading(false);
    }

    useEffect(() => { fetchData(); }, []);

    return (
        <Grid container direction="row" justify="center" alignItems="center">
        {
            isLoading ? <LoadingSpinner />
            : data.length === 0 ? <h2>No results found!</h2>
            : <CardView data={data} />
        }
        </Grid>
    )
}