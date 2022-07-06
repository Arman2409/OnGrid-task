import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router,
        Routes,
        Route,
        Navigate} from 'react-router-dom';
import LogIn from './components/LogIn/Login';
import MainPage from './components/MainPage/MainPage';
import NotFound from './components/NotFound/NotFound';
import { authenticateThunk } from './store/logInSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading/Loading';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const {user} = useSelector((state) => state.logIn)
  const dispatch = useDispatch();

   useEffect(() => {
      if (user) {
        if(user.email) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user])

   useEffect(() => {
     dispatch(authenticateThunk())
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

  return (
      <Router>
        {isAuthenticated !== null ? 
        <Routes>
         <Route path="/" element={isAuthenticated ?  
         <Navigate to='/mainPage'/> :
           <Navigate to='/signIn'/>
         }>
          </Route> 
          <Route path='/signIn' element={<LogIn/>} />
          <Route path='/mainPage' element={<MainPage/>} ></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
        : <Loading />}
      </Router> 
  );
}

export default App;
