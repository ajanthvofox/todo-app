import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context';
import useAccountInfo from "../hooks/useAccountInfo";
const Header = (props) => {
  const [state] = React.useContext(AppContext);
  const { setAccountInfo } = useAccountInfo();
  const navigate = useNavigate();
  const doLogout = () => {
    setAccountInfo('', false);
    navigate('/sign-in');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>
          Aj Todo
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {
              state.loggedIn
                ?
                (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/'}>
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" onClick={() => doLogout()}>
                        Sign Out
                      </a>
                    </li>
                  </>
                )
                :
                (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/sign-in'}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/sign-up'}>
                        Sign up
                      </Link>
                    </li>
                  </>
                )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;