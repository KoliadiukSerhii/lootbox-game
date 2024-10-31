import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { auth, wsConnection } from './helpers/authHelpers';

import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import Home from './components/Home';

function App() {
  const { isAuth, currentUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(auth());
  }, []);

  React.useEffect(() => {
    if (isAuth) {
      dispatch(wsConnection(currentUser.username));
    }
  }, [isAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {!isAuth ? (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/' element={<Navigate to='/login' replace />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
          </>
        ) : (
          <>
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Navigate to='/home' replace />} />
            <Route path='*' element={<Navigate to='/home' replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
