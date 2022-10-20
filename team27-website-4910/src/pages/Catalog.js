import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Layout from "../components/Layout";
import { Button, CircularProgress, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Catalog() {
    const [loading, setLoading] = React.useState(true);
    const [itemList, setItemList] = React.useState();
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
        setParams({ ...searchParams, ['category']: event.target.value });
    };

    const getItems = async () => {
        setLoading(true);
        const response = await fetch('https://team27.cpsc4911.com/catalog', {
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
            {showCatalog()}
        </Layout>
    )
}