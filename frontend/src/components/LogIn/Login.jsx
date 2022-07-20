import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { signInThunk, clearResponse } from '../../store/logInSlice';
import Loading from '../Loading/Loading.jsx';
import {useNavigate} from 'react-router-dom';
import useKeypress from 'react-use-keypress';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
       {'G. A.'}{'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SignIn() {

  //  states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [message, setMessage] = useState('');
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);
    
    const navigate = useNavigate();
    // store 
    const dispatch = useDispatch();
    const { signInResponse } = useSelector((state) => (state.logIn));

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
 
   // sign in button onClick 
  const handleSubmit = (event) => {
    if(!(email && password)) {
      setDisabled(true);
      return;
    }
    if (!/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(email)) {
      setMessage('Please enter email address');
      setError1(true);
      return;
    }
    if (!/(?=.{8,})/.test(password)) {
        setMessage('Password must at least 8 characters');
        setError2(true);
        return;
    }
    if (!/(?=.*[0-9])/.test(password)) {
        setMessage('Password must contain at least 1 number');
        setError2(true);
        return;
    }
     dispatch(clearResponse())
     dispatch(signInThunk({email, password}));
     setIsRequesting(true);
  };

  useKeypress('Enter', () => {
     handleSubmit();
  });

  useEffect(() => {
     if (email && password) {
        setDisabled(false);
     } else {
        setDisabled(true);
     }
  }, [email, password])

  useEffect(() => {
    if(signInResponse){
      setIsRequesting(false);
      if (signInResponse === 'User Not Found') {
        setMessage('User Not Found');
      } else if (signInResponse === 'Wrong Password') {
         setMessage('Wrong Password');
      } else if (typeof(signInResponse) == 'object'){
         navigate('/mainPage');
         dispatch(clearResponse());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInResponse])

  useEffect(() => {
    setDisabled(false);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{
      width: '100%',
      position: 'fixed',
      minHeight: '100%'
    }}>
      <Container component="div" maxWidth="xs">
        <CssBaseline />
        {isRequesting && <Loading />}
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
              onInput={newEmail}
              value={email}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type={passwordVisibility ? "text" : "password"}
              error={error2}
              onInput={newPassword}
              value={password}
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
                            zIndex: '11'
                        }}
                        onClick={() => setPasswordVisibility(!passwordVisibility)}>
                            {passwordVisibility ? <VisibilityIcon sx={{zIndex:2}} /> : <VisibilityOffIcon sx={{zIndex:2}} />}
                        </IconButton>
                    </InputAdornment>
                ),
                sx:{
                    backgroundColor: '#E8F0FE !important',
                }
              }}
            />
            <Typography sx={{
                color: 'red',
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
   </Box>
  );
}

export default SignIn;
