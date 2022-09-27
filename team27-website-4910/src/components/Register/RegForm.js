import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from '@mui/material/Modal';
import { Link, useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 10,
};

export default function RegForm() {
    const navigate = useNavigate();

    //Store and modify form values
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

    //Store and modify errors
    const [errors, setErrors] = React.useState({
        username: '',
        password: '',
        passwordConf: '',
        email: '',
    });

    const modifyErrors = (field, value) => {
        setErrors({ ...errors, [field]: value });
    };

    const checkUsernameError = async () => {
        if (values.username === '') {
            modifyErrors('username', 'Username cannot be empty!')
            return true;
        } else {
            const response = await fetch('http://127.0.0.1:5000/checkuser', {
                method: 'POST',
                body: `{ "user": "${values.username}" }`,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            if (result.result == 'FALSE') {
                modifyErrors('username', 'Username Taken!')
                return true;
            }
        }
        return false;
    }

    //handle opening and closing of success modal
    const [open, setModalOpen] = React.useState(false);

    const handleOpen = () => setModalOpen(true);

    const handleClose = () => setModalOpen(false);

    //do all the things during submit
    const handleSubmit = async () => {
        setLoading(true);
        if (!checkUsernameError()) {
            handleOpen();
            setTimeout(() => { navigate('/login'); }, 5000);
        }
        setLoading(false);
    }

    //Redirect to login page
    const loginRedirect = (e) => {
        e.preventDefault();
        navigate('/login');
    }


    //change based on if waitng on response from API

    const [loading, setLoading] = React.useState(false);

    const formParts = () => {
        return loading ? <CircularProgress /> : (
            <div>
                <Typography textAlign='center' variant='h2' gutterBottom>Create Account</Typography>
                <div>
                    <TextField
                        id="reg-user"
                        label="Username"
                        value={values.username}
                        onChange={handleFormChange('username')}
                        fullWidth
                        error={errors.username == '' ? false : true}
                        helperText={errors.username}
                        required
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
                            error={errors.password == '' ? false : true}
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
                        <FormHelperText id="passht">{errors.password}</FormHelperText>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="passConf">Confirm Password</InputLabel>
                        <OutlinedInput
                            id='passConf'
                            type={values.showPasswordConf ? 'text' : 'password'}
                            value={values.passwordConf}
                            onChange={handleFormChange('passwordConf')}
                            error={errors.passwordConf == '' ? false : true}
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
                        <FormHelperText id="passconfht">{errors.passwordConf}</FormHelperText>
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
                    error={errors.username == '' ? false : true}
                    helperText={errors.username}
                    fullWidth
                    margin='normal'
                />
                <Button variant='outlined' onClick={handleSubmit} sx={{ width: '100%' }}>Submit</Button>
            </div >

        )
    }

    return (
        <Container sx={{
            width: '90% ',
            display: 'flex',
            marginY: '5vh'
        }}>
            <Paper sx={{ width: '100%' }}>
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    padding: '25px'
                }}>
                    <Container>
                        <Stack direction='column' spacing={2} justifyContent='center' alignItems='center' alignContent='center'>
                            {formParts()}
                        </Stack>
                    </Container>
                </Box>
            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack>
                        <Typography variant="h3" component="h2" gutterBottom>
                            Account Created Successfully
                        </Typography>
                        <Typography variant='p' gutterBottom>
                            You will be redirected to sign in in 5 seconds.
                        </Typography>
                        <Link onClick={loginRedirect}>
                            <Typography variant='p' sx={{ my: 2 }}>
                                Click here if you were not redirected...
                            </Typography>
                        </Link>
                    </Stack>
                </Box>
            </Modal>
        </Container>
    )
}
