import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import React from 'react'
import Navbar from '../Navbar/Navbar';



const useLocalState = (key, defaultValue) => {
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
    const [color, setColor] = useLocalState('colorMode', 'dark');
    const handleColorModeChange = (mode) => {
        setColor(mode);
        console.log('ran');
    }

    const getDesignTokens = (mode) => ({
        palette: {
            mode: mode,
            primary: {
                ...(mode === 'dark' ? {
                    main: '#8F13A3'
                } : {
                    main: '#1F8F1D',
                }),
            },
        },
    });

    const theme = createTheme(getDesignTokens(color));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                <Navbar setPageTheme={(mode) => { handleColorModeChange(mode) }} />
                {props.children}
            </div>
        </ThemeProvider>
    )
}
