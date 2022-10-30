import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            ...(mode === 'dark' ? {
                main: '#8F13A3'
            } : {
                main: '#1F8F1D',
            }),
        },
    },
});

export default function Layout(props) {
    const [color, setColor] = useState('dark');
    const handleColorModeChange = (mode) => {
        setColor(mode);
        console.log('ran');
    }

    const theme = createTheme(getDesignTokens(color));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar setPageTheme={handleColorModeChange} />
            <Container>
                {props.children}
            </Container>
        </ThemeProvider>
    )
}
