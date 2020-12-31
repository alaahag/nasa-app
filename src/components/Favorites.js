import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import Grid from '@material-ui/core/Grid';
const axios = require('axios');

export default function Favorites() {
    const [data, setData] = useState([]);

    const fetchData = async() => {
        const dData = await axios.get("http://localhost:3001/images");
        setData(dData.data);
    }

    useEffect(() => { fetchData(); }, [data]);

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            {data.map(m => <CardView data={m} />)}
        </Grid>
    )
}