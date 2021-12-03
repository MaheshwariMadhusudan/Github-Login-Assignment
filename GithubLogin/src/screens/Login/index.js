import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  View,
} from 'react-native';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import {fontSize, colors, spacing} from '../../constants/appStyles';
import {setAsyncStorage} from '../../utils/asyncStorage';
import {useUserInfo} from '../../contexts/userInfo';
import Environment from '../../config/environment';
import Toast from 'react-native-simple-toast';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

const Login = props => {
  const {navigation} = props;
  const {userCode, setUserCode, setAccessToken} = useUserInfo();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userCode) {
      const body = {
        client_id: Environment.APP_CLIENT_ID,
        client_secret: Environment.APP_CLIENT_SECRET,
        redirect_uri: Environment.APP_REDIRECT_URI,
        code: userCode,
      };
      const headers = {
        Accept: 'application/json',
      };
      setLoading(true);
      axios
        .post(`${Environment.BASE_URL}login/oauth/access_token`, body, {
          headers: headers,
        })
        .then(response => {
          const token = response.data && response.data.access_token;
          setAsyncStorage('authToken', token);
          setAccessToken(token);
          Toast.show('Logged In Successfully');
        })
        .catch(error => {
          Alert.alert('Error!', JSON.stringify(error.message), [
            {text: 'OK', onPress: () => {}},
          ]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userCode]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Login" showBackButton={false} />
      {loading ? (
        <View style={styles.loaderContainer}>
          <Loader color={colors.primary} />
        </View>
      ) : (
        <>
          <WebView
            source={{
              uri: `${Environment.BASE_URL}login/oauth/authorize?scope=repo&client_id=${Environment.APP_CLIENT_ID}`,
            }}
            style={styles.webviewStyles}
            onNavigationStateChange={navState => {
              if (navState.url.includes('code')) {
                const code = navState.url.split('code=')[1];
                setUserCode(code);
              }
              // Keep track of going back navigation within component
              // this.canGoBack = navState.canGoBack;
            }}
            incognito
          />
          <TouchableOpacity
            style={styles.menuStyle}
            onPress={() => navigation.navigate('FAQs')}>
            <Text style={styles.bottomSheetLink}>FAQs</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  menuStyle: {
    marginTop: spacing(12),
    marginRight: spacing(12),
    alignSelf: 'flex-end',
  },
  bottomSheetLink: {
    color: colors.primary,
    fontSize: fontSize(18),
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
  },
  webviewStyles: {marginTop: spacing(20), height: '30%', width: '100%'},
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
