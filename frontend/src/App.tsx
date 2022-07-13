import React, { Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { ThemeContextProvider } from './themes/Themes';

import { SystemComponent } from './components';

import { Spinner } from './ui';

import { routes } from './routes';

import { useAppSelector } from './hooks/redux';

import './App.scss';

function App() {

  const user = useAppSelector(state => state.user);

  const isAuth = () => {
    return user.email && user.username;
  }

  const auth = isAuth();

  return (
    <ThemeContextProvider>
      <div className='App theme_light'>
        <Router>
          <Routes>
              {(auth) ? (<>
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
                element={<Navigate to={auth ? (routes.redirect.private) : (routes.redirect.public)} replace />} />
          </Routes>
          <SystemComponent />
        </Router>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
