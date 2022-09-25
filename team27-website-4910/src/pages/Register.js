import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import React from 'react'
import Layout from '../components/Layout';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

export default function Register() {
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        passwordConf: '',
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

    const handleSubmit = async () => {
        const response = await fetch('http://127.0.0.1:5000/checkuser', {
            method: 'POST',
            body: `{ "user": "${values.username}" }`,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(await response);
        console.log(values)
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
                        />
                        <TextField
                            id="reg-password-conf"
                            label="Confirm Password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.passwordConf}
                            onChange={handleFormChange('passwordConf')}
                            fullWidth
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
