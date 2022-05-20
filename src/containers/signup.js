import React from 'react';
import { useNavigate } from 'react-router-dom';
const initialState = {
  showPassword: false,
  loading: false,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};
const Signup = (props) => {
  const [signupState, setSignupState] = React.useState({ ...initialState });
  const navigate = useNavigate();
  const togglePassword = (e) => {
    e.preventDefault();
    setSignupState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };
  const updateInput = (e) => {
    setSignupState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const performSignUp = () => {
    // make API call to sign up
    navigate('/sign-in')
  }
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First name"
            value={signupState.firstName}
            onChange={(e) => updateInput(e)}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            value={signupState.lastName}
            onChange={(e) => updateInput(e)}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={signupState.email}
            onChange={(e) => updateInput(e)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={signupState.password}
            onChange={(e) => updateInput(e)}
          />
          <a href="#!" className='toggle' onClick={togglePassword}>{signupState.showPassword ? 'Hide' : 'Show'}</a>
        </div>

        <div className="d-grid">
          <button onClick={() => performSignUp()} type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </div>
    </div>
  )
};

export default Signup;
