import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
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
    const [theme, setTheme] = useState(lightTheme);

    const handleThemeChange = (theme) => {
        setTheme(theme);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Container>
                {props.children}
            </Container>
        </ThemeProvider>
    )
}
