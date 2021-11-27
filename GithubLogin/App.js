import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useWindowDimensions} from 'react-native';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import {code} from 'esutils';
import {UserInfoProvider} from './src/contexts/userInfo';
import AppStackEntry from './src/navigation';

const App = () => {
  return (
    <UserInfoProvider>
      {/* rendering the navigator */}
      <AppStackEntry />
    </UserInfoProvider>
    // </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
