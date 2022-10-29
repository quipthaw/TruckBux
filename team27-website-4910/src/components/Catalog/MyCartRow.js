import { Typography, Stack, Card, CardMedia, CardContent, IconButton, TextField } from "@mui/material";
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'

export const MyCartRow = (props) => {
    const { setCart, item } = props;
    const [ totalPrice, setTotalPrice ] = useState(item.price * item.quantity);

    const removeItem = () => {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            const itemIndex = newCart.indexOf(item);
            if(itemIndex > -1) {
                newCart.splice(itemIndex, 1);
            }

            return newCart;
        });
    };

    const adjustQuantity = (e) => {
        if(e.target.value > 0) {
            setCart((prevCart) => {
                const newCart = [...prevCart];
                const itemIndex = newCart.indexOf(item);

                console.log(e.target.value);

                newCart[itemIndex].quantity = e.target.value;
                return newCart;
            });

            setTotalPrice(item.price * item.quantity);
        }
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
                        <Typography sx={{ minWidth: '40%'}}>{item.title}</Typography>
                        <TextField
                            label="Price"
                            value={item.price}
                            inputProps={{ disabled: true }}
                            sx={{ minWidth: '15%'}}
                        />
                        <TextField 
                            type="number"
                            label="Quantity"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                            onChange={adjustQuantity}
                            value={item.quantity}
                            sx={{ minWidth: '10%'}}
                        />
                        <TextField
                            label="Total"
                            value={totalPrice.toFixed(2)}
                            inputProps={{ disabled: true }}
                            sx={{ minWidth: '15%'}}
                        />
                        <IconButton color="error" onClick={removeItem} sx={{ minWidth: '10%'}}>
                            <DeleteIcon/>
                        </IconButton>
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
    );
};