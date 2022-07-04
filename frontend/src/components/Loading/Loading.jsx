import React from 'react';
import {Box, CircularProgress} from '@mui/material';

const Loading = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            position: 'fixed',
            top: '0px',
            left: '0px',
            zIndex: '7',
            opacity: '0.5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
          <CircularProgress color="secondary"/>
        </Box>
    )
}

export default Loading;