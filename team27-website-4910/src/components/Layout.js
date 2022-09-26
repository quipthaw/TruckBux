import { CssBaseline, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react'
import Navbar from './Navbar/Navbar';

const darkTheme = createTheme(
    {
        palette: {
            mode: 'dark',
        }
    }
)

const lightTheme = createTheme(
    {
        palette: {
            primary: {
                main: '#1F8F1D',
            },
            secondary: {
                main: '#8F13A3'
            }
        }
    }
)

export default function Layout(props) {

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Navbar />
            {props.children}
        </ThemeProvider>
    )
}
