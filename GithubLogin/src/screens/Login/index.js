import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import {useIsFocused} from '@react-navigation/native';
import {
  fontSize,
  fonts,
  colors,
  spacing,
  rgbaColor,
  scales,
} from '../../constants/appStyles';
import {
  setAsyncStorage,
  getAsyncStorage,
  clearAsyncStorage,
} from '../../utils/asyncStorage';
import {useUserInfo} from '../../contexts/userInfo';
import Environment from '../../config/environment';

const Login = props => {
  const {navigation} = props;
  const {userCode, setUserCode, accessToken, setAccessToken} = useUserInfo();

  useEffect(() => {
    if (userCode) {
      const body = {
        client_id: Environment.APP_CLIENT_ID,
        client_secret: Environment.APP_CLIENT_SECRET,
        redirect_uri: Environment.APP_REDIRECT_URI,
        code: userCode,
      };
      axios.post(`${Environment.BASE_URL}access_token`, body).then(response => {
        const accessTokenObject = response.data.split('&')[0];
        const accessToken = accessTokenObject.split('=')[1];
        setAsyncStorage('authToken', accessToken);
        setAccessToken(accessToken);
      });
    }
  }, [userCode]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: `${Environment.BASE_URL}authorize?scope=user&client_id=${Environment.APP_CLIENT_ID}`,
        }}
        style={{marginTop: 20, height: 20, width: '100%'}}
        onNavigationStateChange={navState => {
          if (navState.url.includes('code')) {
            const code = navState.url.split('code=')[1];
            setUserCode(code);
          }
          // Keep track of going back navigation within component
          // this.canGoBack = navState.canGoBack;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing(12),
    borderBottomWidth: scales(1),
  },
  tabContainer: {
    alignItems: 'center',
    width: '33.33%',
  },
  tabText: {
    color: rgbaColor.greyTwo,
    fontFamily: fonts.WorkSansRegular,
    fontSize: fontSize(16),
  },
  tabTextSelected: {
    color: colors.white,
    fontFamily: fonts.WorkSansRegular,
    fontSize: fontSize(16),
  },
  tab: {
    paddingVertical: spacing(12),
    width: '100%',
    alignItems: 'center',
  },
  tabSelected: {
    paddingVertical: spacing(12),
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: scales(1),
    borderBottomColor: colors.greenOne,
  },
  buttonOneContainer: {
    marginBottom: spacing(15),
  },
  buttonTwoContainer: {
    marginBottom: spacing(30),
  },
  labelStyles: {
    color: colors.greenOne,
  },
  buttonStyles: {
    backgroundColor: rgbaColor.greyOne,
    borderColor: colors.greenOne,
    borderWidth: scales(1),
  },
  bottomSheetBodyContainer: {
    flexDirection: 'row',
    marginBottom: spacing(25),
    marginHorizontal: spacing(15),
    alignItems: 'center',
    width: '100%',
  },
  bottomSheetImageContainer: {
    height: scales(40),
    width: scales(40),
    marginRight: spacing(15),
  },
  bottomSheetTextContent: {
    color: rgbaColor.greyTwo,
    fontSize: fontSize(18),
    fontFamily: fonts.WorkSansRegular,
    maxWidth: '90%',
  },
  bottomSheetLink: {
    color: colors.greenOne,
    fontSize: fontSize(18),
    fontFamily: fonts.WorkSansRegular,
    textDecorationLine: 'underline',
    textDecorationColor: colors.greenOne,
  },
});

export default Login;
