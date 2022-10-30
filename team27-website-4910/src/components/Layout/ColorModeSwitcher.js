import React, { useContext } from "react";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import ColorModeContext from './ColorContext';

const ColorSwitcher = () => {
    const { color, setColor } = useContext(ColorModeContext);
    const handleColorChange = () => {
        setColor(color === 'dark' ? 'light' : 'dark');
    };

    return (
        <IconButton sx={{ ml: 1 }} onClick={handleColorChange} color="inherit">
            {color === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};

export default ColorSwitcher;