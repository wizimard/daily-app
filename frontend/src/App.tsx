import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { ThemeContextProvider } from './themes/Themes';

import { SystemComponent } from './components';

import { Spinner } from './ui';

import { routes } from './routes';

import { useAppDispatch, useAppSelector } from './hooks/redux';

import { userCheckAuth } from './redux/action-creator/UserActionCreator';

import './App.scss';

function App() {

  const dispatch = useAppDispatch();

  const auth = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(userCheckAuth());
  }, []);

  if (auth.isLoading) return (
    <Spinner />
  );

  return (
    <ThemeContextProvider>
      <div className='App theme_light'>
        <Router>
          <Routes>
              {(auth.isAuth) ? (<>
                {routes.private.map((route, index) => (
                  <Route key={index} path={route.path} element={
                    <Suspense fallback={<Spinner text='wait' />}>
                      <route.element />
                    </Suspense>
                  } />
                ))}
              </>) : (<>
                {routes.public.map((route, index) => (
                  <Route key={index} path={route.path} element={
                    <Suspense fallback={<Spinner text='wait' />}>
                      <route.element />
                    </Suspense>
                  } />
                ))}
              </>)}
          <Route path="*" 
                element={<Navigate to={auth.isAuth ? (routes.redirect.private) : (routes.redirect.public)} replace />} />
          </Routes>
          <SystemComponent />
        </Router>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
