import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import Grid from '@material-ui/core/Grid';
const axios = require('axios');

export default function Home(){
    const [data, setData] = useState([]);

    const fetchData = async() => {
        const dData = await axios.get("https://api.nasa.gov/planetary/apod?api_key=8aj7JIekAmX6IvGa6fXtwaC2rtsMdMxGpiKywq9e");
        setData(dData.data);
    }

    useEffect(() => { fetchData(); }, []);

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <CardView data={data} />
        </Grid>
    )
}