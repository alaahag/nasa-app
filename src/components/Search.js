import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import Grid from '@material-ui/core/Grid';
const axios = require('axios');

export default function Search(){
    const [data, setData] = useState([]);

    const fetchData = async() => {
        const txtSearch = document.getElementById("txtSearch").value;
        if (txtSearch) {
            let dData = await axios.get(`https://images-api.nasa.gov/search?q=${txtSearch}&media_type=image`);
            let lessData = [];
            //we get only 10 results so we don't get lags from 100 results
            for (let i = 0; i < 10; i++) {
                const d = dData.data.collection.items[i];
                if (d) {
                    const imgID = d.href.slice('https://images-assets.nasa.gov/image/'.length, d.href.length-16);
                    const img = `https://images-assets.nasa.gov/image/${imgID}/${imgID}~thumb.jpg`;
                    lessData.push({url: img, title: dData.data.collection.items[i].data[0].title, explanation: dData.data.collection.items[i].data[0].description});
                }
            }
            setData(lessData);
        }
    }

    useEffect(() => { fetchData(); });

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            {data.map(m => <CardView data={m} />)}
        </Grid>
    )
}