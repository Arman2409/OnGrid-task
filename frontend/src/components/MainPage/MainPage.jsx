import React,{ useState, useEffect, useRef} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { authenticateThunk } from '../../store/logInSlice';
import Loading from '../Loading/Loading';
import {getResultThunk} from '../../store/mainPageSlice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
     Ghazaryan Arman{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function DashboardContent() {
    // states 
    const [renderStatus, setRenderStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result,setResult] = useState('');

    // refs 
    const timinig = useRef(null);

    const navigate = useNavigate();
    const {user} = useSelector((state) => state.logIn);
    const {userResult} = useSelector((state) => state.mainPage);
    const dispatch = useDispatch();

   const logOut = () => {
      
   };

   useEffect(() => {
    if (!user.email) {
        setRenderStatus(false);
    } else {
        setRenderStatus(true);
    }
    dispatch(authenticateThunk());
    setLoading(true);
    timinig.current = setTimeout(() => {
       if(!user.email) {
        navigate('/signIn');
       } else if (user.email) {
        clearTimeout(timinig.current);
        timinig.current = null;
       }
    }, 1000)
   }, []);

   useEffect(() => {
    if (!user.email) {
        setRenderStatus(false);
    } else {
        setRenderStatus(true);
        dispatch(getResultThunk());
        setLoading(false);
    }
   }, [user]);

   useEffect(() => {
      if (userResult) {
         if (typeof(userResult) == 'number') {
            setResult(userResult);
         }
      } else {
        setResult('Getting your result...')
      }
   }, [userResult])

  return (
    <>
    {renderStatus ? (
      <Box sx={{ display: 'flex' }}>
        {loading && <Loading />}
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: '24px', 
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <Box sx={{ display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                  <AccountCircleIcon />
              <Typography>
                  {user.email}
              </Typography>
              <IconButton 
               onClick={logOut}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
           
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      )       
      : null}
      </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}