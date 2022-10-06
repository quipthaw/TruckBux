import React, { useState, useContext } from 'react';
import { SessionContext } from '../..';
import { Button, TextField, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const UpdatePassword = () => {
    const {
        usernameState
    } = useContext(SessionContext);

    const [ updatingPassword, setUpdatingPassword ] = useState(false);

    const [ oldPassword, setOldPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const [ showPasswordState, setShowPasswordState ] = useState(false);

    const handleShowPassword = () => {
        setShowPasswordState(showPasswordState ? false : true);
    };

    const toggleUpdatingPassword = () => {
        setUpdatingPassword(updatingPassword ? false : true);
    };
    
    const PasswordVisibilityAdornment = () => {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    edge="end"
                >
                    {showPasswordState ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        );
    };

    const onOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const onNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <Stack direction='column' spacing={2} justifyContent='center' alignItems='stretch' alignContent='center'>
            {updatingPassword && <Stack direction='row' spacing={2}>
                <TextField
                    id="oldpassword"
                    label="Old Password"
                    fullWidth
                    value={oldPassword}
                    onChange={onOldPasswordChange}
                    type={showPasswordState ? 'text' : 'password'}
                />
                <TextField
                    id="newpassword"
                    label="New Password"
                    fullWidth
                    value={newPassword}
                    onChange={onNewPasswordChange}
                    type={showPasswordState ? 'text' : 'password'}
                />
                <TextField
                    id="confirmpassword"
                    label="Confirm Password"
                    fullWidth
                    value={confirmPassword}
                    onChange={onConfirmPasswordChange}
                    type={showPasswordState ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <PasswordVisibilityAdornment/>
                        )
                    }}
                />
            </Stack>}
            {!updatingPassword && <Button variant="text" onClick={(toggleUpdatingPassword)} sx={{ width: '100%' }}>Change Password</Button>}
            {updatingPassword && <Button variant="text" onClick={(toggleUpdatingPassword)} sx={{ width: '100%' }}>Confirm Password</Button>}
        </Stack>
    );
};