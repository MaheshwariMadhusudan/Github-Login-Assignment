import React, {useRef, useEffect, useState} from 'react';
import {getAsyncStorage} from '../utils/asyncStorage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import Repos from '../screens/Repos';
import FAQs from '../screens/FAQs';
import AddRepos from '../screens/AddRepos';
import {useUserInfo} from '../contexts/userInfo';

const Stack = createStackNavigator();

const AppStackEntry = () => {
  const navigationRef = useRef();
  const {setAccessToken, setLoggedIn} = useUserInfo();

  useEffect(() => {
    getAsyncStorage('authToken').then(val => {
      if (val != null) {
        setAccessToken(val);
        setLoggedIn(true);
      }
    });
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <RouteStack navigation={navigationRef} />
    </NavigationContainer>
  );
};

const RouteStack = ({navigation}) => {
  const {accessToken, setLoggedIn, isLoggedIn} = useUserInfo();

  useEffect(() => {
    if (accessToken && accessToken.length > 0) {
      setLoggedIn(true);
    }
  }, [accessToken]);

  return (
    <Stack.Navigator headerMode="none">
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Repos" component={Repos} />
          <Stack.Screen name="FAQs" component={FAQs} />
          <Stack.Screen name="AddRepos" component={AddRepos} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="FAQs" component={FAQs} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStackEntry;
