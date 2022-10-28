import { Stack } from "@mui/material";
import React from 'react';
import { MyCartRow } from "./MyCartRow";

export const MyCart = (props) => {
    const { cart, setCart } = props;

    return (
        <Stack direction="column" spacing={2}>
            {cart.map((item) => {
                return (
                    <MyCartRow key={item.itemId} cart={cart} item={item} setCart={setCart}/>
                );
            })}
        </Stack>
    );
};