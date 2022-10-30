import { Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import React from 'react'
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

function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export default function Layout(props) {
    const [color, setColor] = useStickyState('dark', 'colorMode');
    const handleColorModeChange = (mode) => {
        setColor(mode);
        console.log('ran');
    }

    const theme = createTheme(getDesignTokens(color));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar setPageTheme={(mode) => { handleColorModeChange(mode) }} />
            <Container>
                {props.children}
            </Container>
        </ThemeProvider>
    )
}
