/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';

const UserInfoContext = React.createContext(null);

const UserInfoProvider = props => {
  const [userCode, setUserCode] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const values = {
    userCode,
    setUserCode,
    accessToken,
    setAccessToken,
    isLoggedIn,
    setLoggedIn,
  };

  return (
    <>
      <UserInfoContext.Provider value={{...values}} {...props}>
        {props.children}
      </UserInfoContext.Provider>
    </>
  );
};

const useUserInfo = () => React.useContext(UserInfoContext);

export default UserInfoContext;
export {UserInfoProvider, useUserInfo};
