import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CardView from './CardView';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

export default function Favorite(props) {
    const [data, setData] = useState([]),
    [isLoading, setLoading] = useState(true);

    const fetchData = async() => {
        try {
            const id = props.match.params.id
            const dData = await axios.get(`/api/image/${id}`);
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
            : <CardView key="1" data={data} />
        }
        </Grid>
    )
}