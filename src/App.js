import React from 'react';
import Header from './components/header';
import { AppContext, AppContextBase } from './context';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './containers/login';
import SignUp from './containers/signup';
import Home from './containers/home';

function RequireAuth({ children }) {
  const [state] = React.useContext(AppContext);
  return state.loggedIn ? children : <Navigate to="/sign-in" replace />;
}

function RequireGuest({ children }) {
  const [state] = React.useContext(AppContext);
  return !state.loggedIn ? children : <Navigate to="/" replace />;
}

function Wrapper() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            } />
          <Route path="/sign-in" element={
            <RequireGuest>
              <Login />
            </RequireGuest>
          } />
          <Route path="/sign-up" element={
            <RequireGuest>
              <SignUp />
            </RequireGuest>
          } />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AppContextBase>
      <Wrapper />
    </AppContextBase>
  );
};

export default App;
