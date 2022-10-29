import { Stack, Card, CardContent, Typography } from "@mui/material";
import React from 'react';
import { MyCartRow } from "./MyCartRow";

export const MyCart = (props) => {
    const { cart, setCart } = props;

    const getTotal = () => {
        let total = 0;
        cart.forEach((item) => {
            total = total + Number(item.quantity * item.price);
        });

        const totalString = `Total: ${total.toFixed(2)}`

        return totalString;
    };

    return (
        <Stack direction="column">
            {cart.map((item) => {
                return (
                        <MyCartRow key={item.itemId} cart={cart} item={item} setCart={setCart}/>
                );
            })}
            <Card sx={{ backgroundColor: "lightgreen" }}>
                <CardContent sx={{ position: "relative", left: "15%", right: "10%", width: "75%" }}>
                    <Typography align="right" sx={{ fontWeight: "800"}}>{getTotal()}</Typography>
                </CardContent>
            </Card>
        </Stack>
    );
};