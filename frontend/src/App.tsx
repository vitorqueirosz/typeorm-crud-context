import React from 'react';
import { Router } from  'react-router-dom';
import Routes from './routes';

import history from './history';
import { AuthProvider } from './pages/Context/AuthContext';

function App() {
  return (
      <Router history={history}>
        <AuthProvider >
            <Routes />
        </AuthProvider>
      </Router>
  );
}

export default App;
