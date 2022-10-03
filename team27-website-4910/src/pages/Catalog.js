import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Layout from "../components/Layout";
import { Container } from '@mui/system';
import { CircularProgress, Stack } from '@mui/material';

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
                <Stack>
                    {itemList.map((item) => {
                        return (
                            <Card>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.itemId}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.price}
                                </Typography>
                            </Card>
                        )
                    })}
                </Stack>
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