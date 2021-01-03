import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import Grid from '@material-ui/core/Grid';
import LoadingSpinner from './LoadingSpinner';
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function Search(){
    const [data, setData] = useState([]),
    [isLoading, setLoading] = useState(false),
    txtSearch = new URLSearchParams(useLocation().search).get('q');

    const fetchData = async() => {
        if (txtSearch) {
            setLoading(true);
            let dData = await axios.get(`https://images-api.nasa.gov/search?q=${txtSearch}&media_type=image`);

            const parsedData = dData.data.collection.items.map (m => {
                const imgID = m.href.slice('https://images-assets.nasa.gov/image/'.length, m.href.length-16);
                return ({
                    url: `https://images-assets.nasa.gov/image/${imgID}/${imgID}~thumb.jpg`,
                    title: m.data[0].title,
                    explanation: m.data[0].description
                })
            });
            setData(parsedData);
            setLoading(false);
        }
    }

    useEffect(() => { fetchData(); }, [txtSearch]);

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            {
                isLoading ? <LoadingSpinner />
                : data.length === 0 ? <h2>No results found!</h2>
                : data.map(m => <CardView key={Math.random()} data={m} />)
            }
        </Grid>
    )
}