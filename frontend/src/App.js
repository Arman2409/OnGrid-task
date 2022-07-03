import React from 'react';
import { BrowserRouter as Router,
        Routes,
        Route,
        Navigate} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store';
import LogIn from './components/LogIn/Login';
import Loading from './components/Loading/Loading';
import MainPage from './components/MainPage/MainPage';

function App() {
  let isAuthenticated = false;

  return (
    <Provider store={store}>
      <Router>
        <Routes>
         <Route path="/" element={(isAuthenticated ?
             (<Navigate to='/mainPage'/>) :  (<Navigate to='/signIn'/>) )}>
          </Route> 
          <Route path='/signIn' element={<LogIn/>} />
          <Route path='/mainPage' element={<MainPage/>} ></Route>
          <Route ></Route>
        </Routes>
      </Router> 
     </Provider>
  );
}

export default App;
