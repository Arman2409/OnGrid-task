import React from 'react';
import { BrowserRouter as Router,
        Routes,
        Route,
        Navigate} from 'react-router-dom';
// import { Route } from 'react-router';
import {Provider} from 'react-redux';
import store from './store/store';
import LogIn from './components/LogIn/Login';
import Loading from './components/Loading/Loading';

function App() {
  let isAuthenticated;

  return (
    <Provider store={store}>
      <Router>
        <Routes>
         <Route path="/">
            {isAuthenticated == null ? <Loading /> : isAuthenticated ?
            <Navigate path='/mainPage'></Navigate> : <Navigate path='/signIn'></Navigate>}
             <Navigate path='/signIn'></Navigate>
          </Route> 
          <Route path='/signIn'>
            <LogIn />
          </Route>
          <Route path='/mainPage'></Route>
          <Route path="*"></Route>
        </Routes> */}
      </Router> 
     </Provider>
  );
}

export default App;
