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
import { useRecoilState } from 'recoil';
import {
    userType,
    userName,
    userFName,
    userLName,
    userEmail,
    userBio
} from '../../recoil_atoms';

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

    const [sessionState, setSessionState] = useRecoilState(userType);

    //Store and modify form values
    const [values, setValues] = React.useState({
        name: '',
        conversionRate: '1.0',
    });
    //Store and modify errors
    const [errors, setErrors] = React.useState({
        name: '',
        conversionRate: '',
    });

    useEffect(() => {
        setLoading(false);
    }, [])

    const handleFormChange = (field) => (event) => {
        setValues({ ...values, [field]: event.target.value });
    };

    const checkEmptyFields = () => {
        let tempErrors = {
            name: errors.name,
            conversionRate: errors.conversionRate,
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
        const response = await fetch('http://127.0.0.1:5000/createsponsor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.name,
                rate: values.conversionRate,
            }),
        });
        const result = await response.json();
        if (result.error == 'True') {
            let tempErrors = {
                name: errors.name,
                conversionRate: errors.conversionRate,
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
                setTimeout(() => { navigate('/') }, 5000);
            }
        }
        setLoading(false);
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
                                <Typography textAlign='center' variant='h2'>Create Sponsor</Typography>
                                <Typography textAlign='center' variant='subtitle1' gutterBottom>* : Required field</Typography>
                                <TextField
                                    id="sc-name"
                                    label="Sponsor Name"
                                    value={values.name}
                                    onChange={handleFormChange('name')}
                                    fullWidth
                                    error={errors.name == '' ? false : true}
                                    helperText={errors.name}
                                    required
                                />
                                <TextField
                                    id='sc-cr'
                                    value={values.conversionRate}
                                    onChange={handleFormChange('conversionRate')}
                                    error={errors.conversionRate == '' ? false : true}
                                    helperText={errors.conversionRate}
                                    label="Point Conversion Rate"
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
                            Sponsor Created Successfully
                        </Typography>
                        <Typography variant='p' gutterBottom>
                            You will be redirected to home in in 5 seconds.
                        </Typography>
                        <Typography onClick={() => { navigate('/') }} variant='p' sx={{ my: 2 }}>
                            Click here if you were not redirected...
                        </Typography>
                    </Stack>
                </Box>
            </Modal>
        </Container>
    )
}
