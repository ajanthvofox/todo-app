import React from 'react';
import { AppContext } from '../context';

export default function useAccountId() {
  const [state, setState] = React.useContext(AppContext);

  const setAccountInfo = (data, status) => {
    setState((prevState) => ({
      ...prevState,
      accountInfo: data,
      loggedIn: status,
    }));

    if (window.localStorage) {
      window.localStorage.setItem('accountInfo', data);
      window.localStorage.setItem('loggedIn', status);
    }
  };

  return {
    setAccountInfo
  };
}
