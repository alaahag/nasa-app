import React, { useState, useEffect } from 'react';
import CardView from './CardView';
import Grid from '@material-ui/core/Grid';
import LoadingSpinner from './LoadingSpinner';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import SnackBar from './SnackBar';
import utils from '../utils';

export default function Search(){
    const [data, setData] = useState([]),
    [isLoading, setLoading] = useState(false),
    txtSearch = new URLSearchParams(useLocation().search).get('q'),
    [snack, setSnack] = useState({ message: "", severity: "" });

    const fetchData = async() => {
        if (txtSearch) {
            setLoading(true);

            try {
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
            }
            catch {
                setSnack({ message: utils.SnackBarProps.MessageType.CONNECTION_ERROR, severity: utils.SnackBarProps.SeverityType.ERROR });
            }
            finally {
                setLoading(false);
            }
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
            <SnackBar message={snack.message} severity={snack.severity} />
        </Grid>
    )
}