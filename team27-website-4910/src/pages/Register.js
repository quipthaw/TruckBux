import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import Layout from '../components/Layout';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Register() {
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        fname: '',
        lname: '',
        email: '',
        showPassword: false,
    });

    const handleFormChange = (field) => (event) => {
        setValues({ ...values, [field]: event.target.value });
    };

    const handleShowPassword = () => {
        setValues({ ...values, showPassword: values.showPassword == true ? false : true, });
    };

    const handleSubmit = () => {
        console.log('submitted :', values);
    }

    return (
        <div>
            <Layout>
                <Container sx={{ width: '75%' }}>
                    <Paper sx={{ width: '100%', height: '50vh', margin: '10px', padding: '15px', }}>
                        <TextField
                            id="reg-user"
                            label="Username"
                            value={values.username}
                            onChange={handleFormChange('username')}
                            fullWidth
                        />
                        <TextField
                            id="reg-password"
                            label="Password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleFormChange('password')}
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <TextField
                            id="reg-fname"
                            label="First Name"
                            value={values.fname}
                            onChange={handleFormChange('fname')}
                            fullWidth
                        />
                        <TextField
                            id="reg-lname"
                            label="Last Name"
                            value={values.lname}
                            onChange={handleFormChange('lname')}
                            fullWidth
                        />
                        <TextField
                            id="reg-email"
                            label="E-Mail"
                            type='email'
                            value={values.email}
                            onChange={handleFormChange('email')}
                            fullWidth
                        />
                        <Button variant='outlined' onClick={handleSubmit}>Submit</Button>
                    </Paper>
                </Container>
            </Layout >
        </div >
    )
}
