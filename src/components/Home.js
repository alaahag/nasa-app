import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import Grid from '@material-ui/core/Grid';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

export default function Home(){
    const [data, setData] = useState([]),
    [isLoading, setLoading] = useState(true);

    const fetchData = async() => {
        const dData = await axios.get("https://api.nasa.gov/planetary/apod?api_key=8aj7JIekAmX6IvGa6fXtwaC2rtsMdMxGpiKywq9e");
        setData(dData.data);
        setLoading(false);
    }

    useEffect(() => { fetchData(); }, []);

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            {
                isLoading ? <LoadingSpinner /> : data.length === 0 ? <h2>No results found!</h2>
                : <CardView key="1" data={data} />
            }
        </Grid>
    )
}