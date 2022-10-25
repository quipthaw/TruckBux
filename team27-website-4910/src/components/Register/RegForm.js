import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Box, ButtonGroup, CircularProgress, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '../..';

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

    const session = useContext(SessionContext);

    //Store and modify form values
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        passwordConf: '',
        fname: '',
        lname: '',
        email: '',
        type: 'D',
        sponsor: '',
        showPassword: false,
        showPasswordConf: false,
    });
    //Store and modify errors
    const [errors, setErrors] = React.useState({
        username: '',
        password: '',
        fname: '',
        lname: '',
        email: '',
    });

    useEffect(() => {
        getSponsors();
        setLoading(false);
    }, [])

    const handleFormChange = (field) => (event) => {
        setValues({ ...values, [field]: event.target.value });
    };

    const handleShowPassword = () => {
        setValues({ ...values, showPassword: values.showPassword == true ? false : true, });
    };

    const handleShowPasswordConf = () => {
        setValues({ ...values, showPasswordConf: values.showPasswordConf == true ? false : true, });
    };

    const handleCreationType = (type) => {
        setValues({ ...values, ['type']: type });
    };

    const [sponsors, setSponsors] = React.useState([]);
    const getSponsors = async () => {
        const response = await fetch('http://127.0.0.1:5000/getsponsors');
        const result = await response.json();
        changeSponsors(result.sponsors);
    };

    const changeSponsors = (values) => {
        setSponsors(values);
    };

    const checkEmptyFields = () => {
        let tempErrors = {
            username: errors.username,
            password: errors.password,
            fname: errors.fname,
            lname: errors.lname,
            email: errors.email,
        }
        for (let field in tempErrors) {
            if (field != 'passwordConf' && values[field] == '') {
                tempErrors[field] = 'Field cannot be left empty!';
            } else if (errors[field] == 'Field cannot be left empty!') {
                tempErrors[field] = '';
            }
        }
        setErrors(tempErrors);
    };

    const numErrors = () => {
        let num = 0;
        for (let field in errors) {
            if (errors[field] != '' && errors[field] != 'username taken' && errors[field] != 'Expected email in the form XXX@XXX.XXX' && errors[field] != 'Password must contain 8 characters, 1 uppercase, and 1 special character') {
                num++;
            }
        }
        if (values['password'] != values['passwordConf'] || values['password'] == '') { num++; }
        return num;
    };
    const parseResponse = async () => {
        const response = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: values.username,
                pass: values.password,
                fname: values.fname,
                lname: values.lname,
                email: values.email,
                type: values.type,
            }),
        });
        const result = await response.json();
        if (result.error == 'True') {
            let tempErrors = {
                username: errors.username,
                password: errors.password,
                fname: errors.fname,
                lname: errors.lname,
                email: errors.email,
            }
            for (let field in tempErrors) {
                if (field in result) {
                    tempErrors[field] = result[field];
                } else if (errors[field] != 'Field cannot be left empty!') {
                    tempErrors[field] = '';
                }
            }
            setErrors(tempErrors);
            return true;
        }
        return false;

    };

    //handle opening and closing of success modal
    const [open, setModalOpen] = React.useState(false);

    const handleOpen = () => setModalOpen(true);

    const handleClose = () => setModalOpen(false);

    //do all the things during submit
    const handleSubmit = async () => {
        setLoading(true);
        checkEmptyFields();
        if (numErrors() == 0) {
            let error = await parseResponse();
            if (!error) {
                handleOpen();
                setTimeout(() => { navigate('/login') }, 5000);
            }
        }
        setLoading(false);
    }

    //Redirect to login page
    const loginRedirect = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    const showButtons = () => {
        if (session.sessionType == 'S') {
            return (
                <Box textAlign='center'>
                    <Typography variant='h5'>Please Select User Type To Create.</Typography>
                    <Typography variant='subtitle1'>User who are not logged in will only be able to create driver accounts.</Typography>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button variant={values.type == 'D' ? 'contained' : 'outlined'} onClick={() => handleCreationType('D')}>Driver</Button>
                        <Button variant={values.type == 'S' ? 'contained' : 'outlined'} onClick={() => handleCreationType('S')}>Sponsor</Button>
                    </ButtonGroup>
                </Box>
            )
        }
        else if (session.sessionType == 'A') {
            return (
                <Box textAlign='center'>
                    <Typography variant='h5'>Please Select User Type To Create.</Typography>
                    <Typography variant='subtitle1'>User who are not logged in will only be able to create driver accounts.</Typography>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button variant={values.type == 'D' ? 'contained' : 'outlined'} onClick={() => handleCreationType('D')}>Driver</Button>
                        <Button variant={values.type == 'S' ? 'contained' : 'outlined'} onClick={() => handleCreationType('S')}>Sponsor</Button>
                        <Button variant={values.type == 'A' ? 'contained' : 'outlined'} onClick={() => handleCreationType('A')}>Admin</Button>
                    </ButtonGroup>
                </Box>
            )
        }
        else {
            return (
                <Box textAlign='center'>
                    <Typography variant='h5'>Please Select User Type To Create.</Typography>
                    <Typography variant='subtitle1'>User who are not logged in will only be able to create driver accounts.</Typography>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button variant={values.type == 'D' ? 'contained' : 'outlined'} onClick={() => handleCreationType('D')}>Driver</Button>
                    </ButtonGroup>
                </Box>
            )
        }
    };

    const showSponsor = () => {
        if (values.type === 'S' && session.sessionType == 'A') {
            return (
                <FormControl fullWidth>
                    <InputLabel id="sponsor-select-label">Sponsor</InputLabel>
                    <Select
                        labelId="sponsor-select-label"
                        id="sponsor-select"
                        value={values.sponsor}
                        label="Sponsor"
                        onChange={handleFormChange('sponsor')}
                    >
                        {
                            sponsors.map((sponsor) => {
                                <MenuItem value={sponsor.sponsorID}>{sponsor.sponsorName}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            )
        }
    }

    //change based on if waitng on response from API
    const [loading, setLoading] = React.useState(true);

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
                        {loading ? (
                            <Stack direction='column' spacing={2} justifyContent='center' alignItems='center' alignContent='center'>
                                <CircularProgress />
                            </Stack>
                        ) : (
                            <Stack direction='column' spacing={2} justifyContent='center' alignItems='center' alignContent='center'>
                                <Typography textAlign='center' variant='h2'>Create Account</Typography>
                                <Typography textAlign='center' variant='subtitle1' gutterBottom>* : Required field</Typography>
                                {showButtons()}
                                {showSponsor()}
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
                                <Typography textAlign='center' variant='subtitle1'>Password must contain: 8 characters, 1 uppercase, and 1 special character</Typography>
                                <TextField
                                    id='pass'
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleFormChange('password')}
                                    error={errors.password == '' ? false : true}
                                    helperText={errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleShowPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    label="Password"
                                    fullWidth
                                    required
                                />
                                <TextField
                                    id='pass'
                                    type={values.showPasswordConf ? 'text' : 'password'}
                                    value={values.passwordConf}
                                    onChange={handleFormChange('passwordConf')}
                                    error={values.password == values.passwordConf ? false : true}
                                    helperText={values.passwordConf == '' && values.password == '' ? '' : values.password == values.passwordConf ? 'Passwords match!' : 'Passwords do not match!'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleShowPasswordConf}
                                                    edge="end"
                                                >
                                                    {values.showPasswordConf ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    label="Confirm Password"
                                    fullWidth
                                    required
                                />
                                <TextField
                                    id="reg-fname"
                                    label="First Name"
                                    value={values.fname}
                                    onChange={handleFormChange('fname')}
                                    fullWidth
                                    error={errors.fname == '' ? false : true}
                                    helperText={errors.fname}
                                    required
                                />
                                <TextField
                                    id="reg-lname"
                                    label="Last Name"
                                    value={values.lname}
                                    onChange={handleFormChange('lname')}
                                    fullWidth
                                    error={errors.lname == '' ? false : true}
                                    helperText={errors.lname}
                                    required
                                />
                                <TextField
                                    id="reg-email"
                                    label="E-Mail"
                                    type='email'
                                    value={values.email}
                                    onChange={handleFormChange('email')}
                                    error={errors.email == '' ? false : true}
                                    helperText={errors.email}
                                    fullWidth
                                    required
                                />
                                <Button variant='outlined' onClick={handleSubmit} sx={{ width: '100%' }}>Submit</Button>
                            </Stack>
                        )}
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
                        <Typography onClick={loginRedirect} variant='p' sx={{ my: 2 }}>
                            Click here if you were not redirected...
                        </Typography>
                    </Stack>
                </Box>
            </Modal>
        </Container>
    )
}
