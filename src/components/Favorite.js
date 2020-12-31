import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CardView from './CardView';
const axios = require('axios');

export default function Favorite(props) {
    const [data, setData] = useState([]);

    const fetchData = async() => {
        const id = props.match.params.id
        const dData = await axios.get(`http://localhost:3001/image/${id}`);
        setData(dData.data);
    }

    useEffect(() => { fetchData(); });

    return (
        <Grid  container direction="row" justify="center" alignItems="center">
            {data ? <CardView data={data} /> : ""}
        </Grid>
    )
}