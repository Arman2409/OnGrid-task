import React from 'react';
import { Box, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <Box
        sx={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: '0px',
            left: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: 'black',
            opacity: '0.7'
        }}>
            <Typography 
             variant='h2'
             sx={{
                color: 'red'
            }}>
                Page Not Found!
            </Typography>
            <Link 
              to='/'
              style={{
                marginBottom: '70px'
              }}>
                Go to main page
            </Link>

        </Box>
    )
}

export default NotFound;