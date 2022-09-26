import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function RegForm() {
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        passwordConf: '',
        fname: '',
        lname: '',
        email: '',
        showPassword: false,
        showPasswordConf: false,
    });

    const handleFormChange = (field) => (event) => {
        setValues({ ...values, [field]: event.target.value });
    };

    const handleShowPassword = () => {
        setValues({ ...values, showPassword: values.showPassword == true ? false : true, });
    };

    const handleShowPasswordConf = () => {
        setValues({ ...values, showPasswordConf: values.showPasswordConf == true ? false : true, });
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
        <Container sx={{
            width: '90% ',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginY: '5vh'
        }}>
            <Paper sx={{ width: '100%' }}>
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    padding: '25px'
                }}>
                    <Container>
                        <Stack spacing={2}>
                            <Typography textAlign='center' variant='h2' gutterBottom>Create Account</Typography>
                            <div>
                                <TextField
                                    id="reg-user"
                                    label="Username"
                                    value={values.username}
                                    onChange={handleFormChange('username')}
                                    fullWidth
                                />
                            </div>
                            <div>
                                <FormControl
                                    variant="outlined"
                                    margin='normal'
                                    fullWidth
                                >
                                    <InputLabel htmlFor='pass'>Password</InputLabel>
                                    <OutlinedInput
                                        id='pass'
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleFormChange('password')}
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
                                        label="Password"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="passConf">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id='passConf'
                                        type={values.showPasswordConf ? 'text' : 'password'}
                                        value={values.passwordConf}
                                        onChange={handleFormChange('passwordConf')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleShowPasswordConf}
                                                    edge="end"
                                                >
                                                    {values.showPasswordConf ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm Password"
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <TextField
                                    id="reg-fname"
                                    label="First Name"
                                    value={values.fname}
                                    onChange={handleFormChange('fname')}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id="reg-lname"
                                    label="Last Name"
                                    value={values.lname}
                                    onChange={handleFormChange('lname')}
                                    fullWidth
                                />
                            </div>

                            <TextField
                                id="reg-email"
                                label="E-Mail"
                                type='email'
                                value={values.email}
                                onChange={handleFormChange('email')}
                                fullWidth
                                margin='normal'
                            />
                            <Button variant='outlined' onClick={handleSubmit}>Submit</Button>
                        </Stack>

                    </Container>
                </Box>
            </ Paper>
        </Container>
    )
}
