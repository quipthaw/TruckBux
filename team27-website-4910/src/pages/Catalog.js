import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Layout from "../components/Layout";
import { CircularProgress, Grid } from '@mui/material';

export default function Catalog() {
    const [loading, setLoading] = React.useState(true);
    const [itemList, setItemList] = React.useState();

    const getItems = async () => {
        const response = await fetch('http://ec2-52-205-128-217.compute-1.amazonaws.com:8080/catalog');
        if (response.ok) {
            console.log("set");
            const result = await response.json();
            setItemList(result.items);
        } else {
            console.log("not set")
        }
        setLoading(false);
    };

    React.useEffect(() => {
        getItems();
    }, []);

    const showCatalog = () => {
        if (loading) {
            return (
                <CircularProgress />
            )
        } else {
            return (
                <Grid container spacing={2} sx={{ marginTop: '1vh' }}>
                    {itemList.map((item) => {
                        return (
                            <Grid item xs={12} sm={6} lg={4}>
                                <Card sx={{ height: '100%' }}>
                                    <CardMedia sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: 'center'
                                    }}>
                                        <img src={item.image} alt={item.title} style={{ width: '200px', height: '200px' }} />
                                    </CardMedia>
                                    <CardContent>
                                        <Typography gutterBottom textAlign='right' variant="h5" component="div">
                                            {item.title}
                                        </Typography>
                                        <Typography textAlign='right' variant="body2" color="text.secondary">
                                            {item.itemId}
                                        </Typography>
                                        <Typography textAlign='right' variant="body2" color="text.secondary">
                                            {'TB ' + item.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            )
        }
    }

    return (
        <Layout>
            {showCatalog()}
        </Layout>
    )
}