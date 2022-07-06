import React,{ useState, useEffect, useRef} from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { Card, CardContent} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { authenticateThunk, clearUser } from '../../store/logInSlice';
import Loading from '../Loading/Loading';
import {getResultThunk, logOutThunk, clearLogOutResponse} from '../../store/mainPageSlice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
     {'G. A.'}{' '}
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
    const [status, setStatus] = useState('')

    // refs 
    const timinig = useRef(null);

    const navigate = useNavigate();
    // store
    const {user} = useSelector((state) => state.logIn);
    const {userResult, logOutResponse} = useSelector((state) => state.mainPage);
    const dispatch = useDispatch();

   const logOut = () => {
      dispatch(logOutThunk());
      dispatch(clearUser());
   };

   useEffect(() => {
      if (!user.email) {
         setRenderStatus(false);
         timinig.current = setTimeout(() => {
          if(!user.email) {
           navigate('/signIn');
          } else if (user.email) {
           clearTimeout(timinig.current);
           timinig.current = null;
          }
      }, 1000)
      dispatch(authenticateThunk());
      setLoading(true);
     } else {
         setRenderStatus(true);
     }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
    if (!user.email) {
        setRenderStatus(false);
    } else {
        setRenderStatus(true);
        dispatch(getResultThunk());
        setLoading(false);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user]);

   useEffect(() => {
      if (userResult) {
            setResult(userResult);
            const number = parseInt(userResult);
            if (number) {
                setStatus(number > 4 ? "PASSED" : "NOT PASSED")
            }
      } else {
        setResult('Getting your result...')
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userResult])

   useEffect(() => {
      if (logOutResponse) {
         if (logOutResponse === 'Logged Out') {   
            dispatch(clearLogOutResponse());
            clearTimeout(timinig.current);
            navigate('/signIn');
         }
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [logOutResponse])

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
                  {!user.email ? 'username' : user.email}
              </Typography>
              <IconButton 
              sx={{ml:'20px'}}
               onClick={logOut}>
                <LogoutIcon sx={{fontSize: '30px'}}/>
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
            <Card sx={{width: '320px', height: '200px'}}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
                Exam result
              </Typography>
              <Typography  color="text.secondary">
               Your score is
              </Typography>
              <Typography sx={{ mt: 1.5 ,mb: 0.5 }} variant="h5" color="black">
                {result} of 10
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {status}
              </Typography>
            </CardContent>
            </Card>
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