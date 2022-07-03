import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '} Ghazaryan Arman
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('red')
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const newEmail = (e) => {
        setEmail(e.target.value);
        if (error1) {
            setError1(false);
        }
    };
   
    const newPassword = (e) => { 
       setPassword(e.target.value);
       if (error2) {
        setError2(false);
    }
    };

  const handleVisibility = () => {
    console.log("click")
    setPasswordVisibility(!passwordVisibility)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(email)) {
      setMessage('Please enter email address');
      setError1(true);
      setMessageColor('red');
      return;
    }
    if (!/(?=.{8,})/.test(password)) {
        setMessage('Password must at least 8 characters');
        setError2(true);
        setMessageColor('red');
        return;
    }
    if (!/(?=.*[0-9])/.test(password)) {
        setMessage('Password must contain at least 1 number');
        setError2(true);
        setMessageColor('red');
        return;
    }
  };

  useEffect(() => {
     if (email && password) {
        setDisabled(false);
     } else {
        setDisabled(true);
     }
  }, [email, password])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={error1}
              autoComplete="email"
              onChange={newEmail}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type={passwordVisibility ? "text" : "password"}
              error={error2}
              onChange={newPassword}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                    <InputAdornment 
                    position="end"
                    sx={{
                        backgroundColor: '#E8F0FE !important',
                        height: '100%'  }}>
                        <IconButton
                        sx={{
                            cursor: 'pointer',
                            zIndex: '6'
                        }}
                        onClick={handleVisibility}>
                            {passwordVisibility ? <VisibilityIcon/> : <VisibilityOffIcon />}
                        </IconButton>
                    </InputAdornment>
                ),
                sx:{
                    backgroundColor: '#E8F0FE !important',
                }
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Typography sx={{
                color: messageColor,
            }}>
                {message}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              disabled={disabled}
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;