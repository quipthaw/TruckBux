import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import './HeroSection.css';

export default function HeroSection() {
    return (
        <div className='hero-container'>
            <img className='hero' src='/trukhero.webp' />
            <div className='hero-text-container'>
                <Stack flexDirection='row' alignItems='center' justifyContent='flex-end' sx={{ height: '100%' }}>
                    <Stack flexDirection='column' width='30%' justifyContent='center' sx={{ height: '75%', maxHeight: '75vh' }}>
                        <Typography textAlign='right' variant='h3' component='h1' gutterBottom sx={{
                            color: 'white'
                        }}>
                            Welcome to TrukBux!
                        </Typography>
                        <Typography paragraph sx={{
                            color: 'white'
                        }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                    </Stack>
                </Stack>
            </div>
        </div>
    )
}
