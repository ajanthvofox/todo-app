import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAccountInfo from "../hooks/useAccountInfo";
const initialState = {
  showPassword: false,
  loading: false,
  email: '',
  password: '',
};
const Login = (props) => {
  const [loginState, setLoginState] = React.useState({ ...initialState });
  const { setAccountInfo } = useAccountInfo();
  const navigate = useNavigate();
  const togglePassword = (e) => {
    e.preventDefault();
    setLoginState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };
  const updateInput = (e) => {
    setLoginState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };  
  const notify = () => toast.error("Please enter email and password to login!");
  const performLogin = () => {
    if (loginState.email && loginState.password) {
      // make API call to login then set the returned data as accountInfo
      const data = { // hardcoded dummy data for now as no API
        email: 'ajanthwithu@gmail.com',
        fullName: 'Ajanth R',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI',
      };
      setAccountInfo(JSON.stringify(data), true);
      navigate('/')
    } else {
      notify();
    }
  }
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={loginState.email}
            onChange={(e) => updateInput(e)}
          />
        </div>
        <div className="mb-3 password">
          <label>Password</label>
          <input
            name="password"
            type={loginState.showPassword ? 'text' : 'password'}
            className="form-control"
            placeholder="Enter password"
            value={loginState.password}
            onChange={(e) => updateInput(e)}
          />
          <a href="#!" className='toggle' onClick={togglePassword}>{loginState.showPassword ? 'Hide' : 'Show'}</a>
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              &nbsp;Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button onClick={() => performLogin()} type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#!">password?</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
};

export default Login;