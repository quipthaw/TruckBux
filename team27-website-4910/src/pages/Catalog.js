import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Layout from "../components/Layout";
import { Container } from '@mui/system';
import { CircularProgress, Grid, Stack } from '@mui/material';

export default function Catalog() {
    const [loading, setLoading] = React.useState(true);
    const [itemList, setItemList] = React.useState();

    const getItems = async () => {
        const response = await fetch('http://127.0.0.1:5000/catalog');
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
                <Grid container spacing={2} sx={{ margin: '15px' }}>
                    {itemList.map((item) => {
                        return (
                            <Grid item>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia>
                                        <img src={item.image} alt={item.title} style={{ height: '250px' }} />
                                    </CardMedia>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.itemId}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.price}
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
            <Container>
                {showCatalog()}
            </Container>
        </Layout>
    )
}