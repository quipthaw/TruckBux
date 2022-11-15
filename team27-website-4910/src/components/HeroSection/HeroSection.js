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
                        <Typography textAlign='right' variant='h1' component='h1' gutterBottom sx={{
                            color: 'white'
                        }}>
                            Welcome to TrukBux!
                        </Typography>
                        <Typography paragraph sx={{
                            color: 'white'
                        }}>
                            Here we strive to reward all the hardwork truckers provide to our sponsors! We seek to promote safe driving and a sense of community within our drivers. Keep on trucking!
                        </Typography>
                    </Stack>
                </Stack>
            </div>
        </div>
    )
}
