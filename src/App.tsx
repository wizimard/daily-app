import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Sidebar } from './components';

import { routes } from './routes';

import './App.scss';

function App() {

  return (
      <div className="App">
        <Router>
          <Sidebar />
          <Routes>
            {routes.private.map((route, index) => (
              <Route key={index} path={route.path} element={<route.element />} />
            ))}
          </Routes>
        </Router>
      </div>
  );
}

export default App;
