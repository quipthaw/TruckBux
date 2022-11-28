import * as React from 'react';
import Typography from '@mui/material/Typography';
import Layout from "../components/Layout/Layout";
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MyCart } from '../components/Catalog/MyCart';
import { Stack } from '@mui/system';
import { useRecoilState } from 'recoil';
import { userName, userType } from '../recoil_atoms';
import { UserSelection } from '../components/Catalog/UserSelection';

export default function Catalog() {
    const [loading, setLoading] = React.useState(true);
    const [itemList, setItemList] = React.useState();
    const [cart, setCart] = React.useState([]);
    const [openCart, setOpenCart] = React.useState(false);
    const [cartButtonMessage, setCartButtonMessage] = React.useState('');
    const [searchParams, setParams] = React.useState({
        category: "293",
        search: "",
        price: "[0..250]",
    })

    const [userAlert, setUserAlert] = React.useState(false);
    const [userAlertMessage, setUserAlertMessage] = React.useState("");
    const [userAlertSeverity, setUserAlertSeverity] = React.useState("success");

    const [usernameState, setUsernameState] = useRecoilState(userName);

    const [ selectedSponsor, setSelectedSponsor ] = React.useState("");
    const [ selectedDriver, setSelectedDriver ] = React.useState("");
    const [ processingPurchase, setProcessingPurchase ] = React.useState(false);

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
        for (let i = 0; i < cart.length; ++i) {
            if (cart[i].itemId === item.itemId) {
                cart[i].quantity++;
                isNewItem = false;
                break;
            }
        }

        //If item isn't in cart, add it to 
        if (isNewItem) {
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
            //console.log("set");
            const result = await response.json();
            setItemList(result.items);
            console.log(result.items);
        } else {
            //console.log("not set")
        }
        setLoading(false);
    };

    const getCartSize = () => {
        let size = 0;
        for (let i = 0; i < cart.length; ++i) {
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

    React.useEffect(() => {
        getMyCart();
    }, [itemList])

    const saveCartRequest = async () => {
        console.log(cart)
        const url = 'http://127.0.0.1:5000/Cart';
        const data = {
            'user': usernameState,
            'items': [...cart]
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, options);
        const result = await response.json();

        return result.result === "success";
    };

    const saveMyCartOnClick = async () => {
        setProcessingPurchase(true);
        const result = await saveCartRequest();

        if (result) {
            setUserAlert(true);
            setUserAlertSeverity("success");
            setUserAlertMessage("Your cart has been saved!");
        }
        else {
            setUserAlert(true);
            setUserAlertSeverity("error");
            setUserAlertMessage("Something went wrong. We were unable to save your cart!");
        }

        closeMyCart();
        setProcessingPurchase(false);
    };

    const purchaseCartRequest = async () => {
        const url = 'http://127.0.0.1:5000/purchase';
        const data = {
            'driver': selectedDriver,
            'sponsor': selectedSponsor,
            'active_user': usernameState,
        };
        console.log(selectedDriver)
        console.log(selectedSponsor )
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, options);
        const result = await response.json();

        return result.result;
    }

    const purchaseMyCartOnClick = async () => {
        setProcessingPurchase(true);
        const storeCartResult = await saveCartRequest();

        if(storeCartResult) {
            const purchaseResult = await purchaseCartRequest();

            if(purchaseResult === "Bought") {
                setUserAlert(true);
                setUserAlertSeverity("success");
                setUserAlertMessage("Your purchase has been made!");
            }
            else {
                setUserAlert(true);
                setUserAlertSeverity("error");
                setUserAlertMessage(purchaseResult);
            }
        }

        closeMyCart();
        setCart([]);
        setProcessingPurchase(false);
    }

    const retrieveItemInfo = (cartItem) => {
        return (
            itemList.find((catalogItem) => {
                return cartItem.itemId === catalogItem.itemId;
            })
        );
    };

    const getMyCart = async () => {
        if (itemList !== undefined) {
            const url = `http://127.0.0.1:5000/Cart?user=${usernameState}`;

            const response = await fetch(url);
            const result = await response.json();

            let buildingCart = [];

            result.forEach((cartItem) => {
                const newCartItem = {
                    ...retrieveItemInfo(cartItem),
                    'quantity': cartItem.quantity,
                }
                buildingCart.push(newCartItem);
            })

            setCart(buildingCart);
            getCartSize();
        }
    }

    const closeAlert = () => {
        setUserAlert(false);
        setUserAlertSeverity("success");
        setUserAlertMessage("");
    }

    const showCatalog = () => {
        if (loading) {
            return (
                <CircularProgress />
            )
        } else {
            return (
                <Grid container spacing={1}>
                    {itemList.map((item) => {
                        return (
                            <Grid key={item.itemId} item xs={12} md={6} lg={4}>
                                <Paper sx={{
                                    height: '100%'
                                }}>
                                    <Stack direction='column' alignContent='flex-end' sx={{
                                        height: '100%'
                                    }}>
                                        <Box m='auto' sx={{
                                            minHeight: 250
                                        }}>
                                            <img src={item.image} alt={item.title} style={{ width: '200px', height: '200px' }} />
                                        </Box>
                                        <Box sx={{
                                            minHeight: 100
                                        }}>
                                            <Typography gutterBottom textAlign='right' variant="h6">
                                                {item.title}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            minHeight: 25
                                        }}>
                                            <Stack flexDirection='row' justifyContent='flex-end' alignItems='center'>
                                                <img src='/TruckBuck.svg' width={25} />
                                                <Typography textAlign='right' variant="subtitle1" color="text.secondary">
                                                    {item.price}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                        <Button variant="contained" onClick={() => toCart(item)}>Add To Cart</Button>
                                    </Stack>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            )
        }
    }

    return (
        <Layout>
            {userAlert && <Alert onClose={() => { closeAlert() }} severity={userAlertSeverity}>{userAlertMessage}</Alert>}
            <Stack direction='column' spacing={6} sx={{ my: '1vh' }}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' spacing={2}>
                    <Box sx={{ width: '70%' }}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Search"
                            onChange={handleSearchChange('search')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            sx={{
                                width: { xs: '80%', md: '60%' }
                            }}
                        />
                        <Button variant='contained' onClick={getItems} sx={{
                            width: { xs: '20%', md: '10%' }
                        }}>
                            Search
                        </Button>
                    </Box>

                    <Box sx={{ width: '10%' }}>
                        <UserSelection user={usernameState} requestedType={'S'} selection={selectedSponsor} setSelection={setSelectedSponsor}/>
                    </Box>
                    <Box sx={{ width: '10%' }}>
                        <UserSelection user={usernameState} requestedType={'D'} selection={selectedDriver} setSelection={setSelectedDriver}/>
                    </Box>
                    <Box sx={{ width: '10%' }}>
                        <Button variant='contained' onClick={openMyCart}>{cartButtonMessage}</Button>
                    </Box>
                    
                </Stack>
                <Stack direction='row'>
                    <Box>
                        <Typography gutterBottom variant='h6'>Search Options</Typography>
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
                                        <FormControlLabel key={item.itemId} value={item.number} control={<Radio />} label={item.name} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    {showCatalog()}
                </Stack>

                {openCart &&
                    <Dialog open={openCart} onClose={closeMyCart} fullWidth maxWidth="md">
                        <MyCart cart={cart} setCart={setCart} />
                        <DialogActions>
                            <Button disabled={processingPurchase} variant="contained" onClick={saveMyCartOnClick}>Save My Cart</Button>
                            <Button disabled={processingPurchase} variant="contained" onClick={closeMyCart}>Close</Button>
                            <Button disabled={processingPurchase} variant="contained" onClick={purchaseMyCartOnClick}>Purchase</Button>
                        </DialogActions>
                    </Dialog>
                }
            </Stack>
        </Layout>
    )
}