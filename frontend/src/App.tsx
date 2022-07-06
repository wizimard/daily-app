import React, { Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { Sidebar, SystemComponent, Spinner } from './components';

import { routes } from './routes';

import './App.scss';
import { useAppSelector } from './hooks/redux';

function App() {

  const user = useAppSelector(state => state.user);

  const isAuth = () => {
    return user.email && user.username;
  }

  const auth = isAuth();

  return (
      <div className="App">
        <Router>
          {(auth) && (
            <Sidebar />
          )}
          <Routes>
              {(auth) ? (<>
                {routes.private.map((route, index) => (
                  <Route key={index} path={route.path} element={
                    <Suspense fallback={<Spinner />}>
                      <route.element />
                    </Suspense>
                  } />
                ))}
              </>) : (<>
                {routes.public.map((route, index) => (
                  <Route key={index} path={route.path} element={
                    <Suspense fallback={<Spinner />}>
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
  );
}

export default App;
