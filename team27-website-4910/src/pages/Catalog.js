import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Layout from "../components/Layout";
import { Button, CircularProgress, Dialog, DialogActions, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MyCart } from '../components/Catalog/MyCart';

export default function Catalog() {
    const [loading, setLoading] = React.useState(true);
    const [itemList, setItemList] = React.useState();
    const [ cart, setCart ] = React.useState(new Array());
    const [ openCart, setOpenCart ] = React.useState(false);
    const [ cartButtonMessage, setCartButtonMessage ] = React.useState('');
    const [searchParams, setParams] = React.useState({
        category: "293",
        search: "",
        price: "[0..250]",
    })
    const categories = [
        {
            name: "Consumer Electronics",
            number: 293,
        },
        {
            name: "Sporting Goods",
            number: 888,
        },
    ]

    const handleSearchChange = (field) => (event) => {
        setParams({ ...searchParams, [field]: event.target.value });
    };

    const handleCategoryChange = (event) => {
        setParams({ ...searchParams, 'category': event.target.value });
    };

    const toCart = (item) => {
        let isNewItem = true;
        //Check if item already added, if so increment quantity
        for(let i = 0; i < cart.length; ++i) {
            if(cart[i].itemId === item.itemId) {
                cart[i].quantity++;
                isNewItem = false;
                break;
            }
        }

        //If item isn't in cart, add it to 
        if(isNewItem) {
            let newItem = {
                ...item,
                'quantity': 1,
            }
            cart.push(newItem);
        }

        setCart(cart);
        getCartSize();
    };

    const openMyCart = () => {
        setOpenCart(true);
    };

    const closeMyCart = () => {
        setOpenCart(false);
    };

    const getItems = async () => {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:5000/catalog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: searchParams.category,
                search: searchParams.search,
                price: searchParams.price,
            }),
        });
        if (response.ok) {
            console.log("set");
            const result = await response.json();
            setItemList(result.items);
        } else {
            console.log("not set")
        }
        setLoading(false);
    };

    const getCartSize = () => { 
        let size = 0;
        for(let i = 0; i < cart.length; ++i) {
            size = size + Number(cart[i].quantity);
        }
        const newMessage = `My Cart: ${size}`
        setCartButtonMessage(newMessage);
    };

    //Catalog effect management
    React.useEffect(() => {
        getItems();
    }, []);

    //Cart effect management
    React.useEffect(() => {
        getCartSize();
    }, [cart]);

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
                                    <Button variant="contained" onClick={() => toCart(item)}>Add To Cart</Button>
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
            <TextField
                id="input-with-icon-textfield"
                label="TextField"
                onChange={handleSearchChange('search')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                variant="standard"
            />
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Category</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={searchParams.category}
                    onChange={handleCategoryChange}
                >
                    {categories.map((item) => {
                        return (
                            <FormControlLabel value={item.number} control={<Radio />} label={item.name} />
                        )
                    })}
                </RadioGroup>
            </FormControl>
            <Button variant='contained' onClick={getItems}>
                Search
            </Button>
            <Button variant='contained' onClick={openMyCart}>{cartButtonMessage}</Button>
            {openCart &&
                <Dialog open={openCart} onClose={closeMyCart} fullWidth maxWidth="md">
                    <MyCart cart={cart} setCart={setCart}/>
                    <DialogActions>
                        <Button variant="contained" onClick={closeMyCart}>Close</Button>
                    </DialogActions>
                </Dialog>
            }
            {showCatalog()}
        </Layout>
    )
}