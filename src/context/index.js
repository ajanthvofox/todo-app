import React, { createContext, useState } from 'react';

const AppContext = createContext([{}, () => {}]);

const getUserDetails = () => {
  let accountInfo;
  if (window.localStorage) {
    accountInfo = window.localStorage.getItem('accountInfo');
  }
  return accountInfo ? accountInfo : null;
};

const getLoginStatus = () => {
  let accountInfo;
  if (window.localStorage) {
    accountInfo = window.localStorage.getItem('accountInfo');
  }
  return accountInfo ? true : false;
};

const storeInitialState = {
  loggedIn: getLoginStatus(),
  accountInfo: getUserDetails(),
};

const AppContextBase = props => {
  const [state, setState] = useState(storeInitialState);

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  )
};

export { AppContext, AppContextBase };
