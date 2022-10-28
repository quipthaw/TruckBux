import { Typography, Stack, Card, CardMedia, CardContent, IconButton, TextField } from "@mui/material";
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete'

export const MyCartRow = (props) => {
    const { cart, setCart, item } = props;

    const removeItem = () => {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            const itemIndex = newCart.indexOf(item);
            if(itemIndex > -1) {
                newCart.splice(itemIndex, 1);
            }

            return newCart;
        })
    };

    return (
        <Card>
            <Stack direction="row" spacing={2}>
                <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.itemId}
                    sx={{ 
                        objectFit: 'contain',
                        width: '15%' 
                    }}
                />
                <CardContent sx={{ width: '85%' }}>
                    <Stack direction="row" spacing={2}>
                        <Typography>{item.title}</Typography>
                        <Typography>{item.price}</Typography>
                        <TextField type="number" value={item.quantity}/>
                        <IconButton color="error" onClick={removeItem}>
                            <DeleteIcon/>
                        </IconButton>
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
    );
};