import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from 'axios';
import {fontSize, colors, spacing, scales} from '../../constants/appStyles';
import Header from '../../components/Header';
import {useUserInfo} from '../../contexts/userInfo';
import ProfileImage from '../../components/ProfileImage';
import Environment from '../../config/environment';
import {clearAsyncStorage} from '../../utils/asyncStorage';
import Toast from 'react-native-simple-toast';
import Loader from '../../components/Loader';

const Profile = props => {
  const {navigation} = props;
  const {accessToken, clearUserInfo} = useUserInfo();
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    axios
      .get(`${Environment.API_BASE_URL}user`, {
        headers: headers,
      })
      .then(response => {
        setProfileDetails(response.data);
      })
      .catch(err => {
        Alert.alert('Error!', JSON.stringify(err.message), [
          {text: 'OK', onPress: () => {}},
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onPressLogout = () => {
    Alert.alert(
      '',
      'Are you sure you want to Logout?',
      [
        {
          text: 'Yes',
          onPress: () => {
            clearUserInfo();
            clearAsyncStorage();
            Toast.show('Logged Out Successfully');
          },
        },
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" showBackButton={false} />
      {loading ? (
        <View style={styles.loaderContainer}>
          <Loader color={colors.primary} />
        </View>
      ) : (
        <>
          <View style={styles.profileContainer}>
            <View>
              <ProfileImage imageUrl={profileDetails.avatar_url} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.userNameContainer}>
                {profileDetails.login}
              </Text>
              <Text style={styles.fullName}>{profileDetails.name}</Text>
            </View>
          </View>
          <View style={styles.listContainer}>
            <TouchableOpacity
              style={styles.menuStyle}
              onPress={() => navigation.navigate('Repos')}>
              <Text style={styles.bottomSheetLink}>Repos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuStyle}
              onPress={() =>
                navigation.navigate('FAQs', {
                  profileDetails: profileDetails,
                })
              }>
              <Text style={styles.bottomSheetLink}>FAQs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuStyle}
              onPress={() => {
                onPressLogout();
              }}>
              <Text style={styles.bottomSheetLink}>Logout</Text>
            </TouchableOpacity>
          </View>
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
  profileContainer: {
    width: '90%',
    alignSelf: 'center',
    height: scales(100),
    borderWidth: scales(1),
    borderRadius: scales(5),
    borderColor: colors.greyOne,
    marginTop: spacing(20),
    padding: spacing(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: spacing(10),
  },
  userNameContainer: {
    fontWeight: '700',
    fontSize: fontSize(18),
  },
  listContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: spacing(10),
    flex: 1,
  },
  menuStyle: {
    marginTop: spacing(12),
  },
  bottomSheetLink: {
    color: colors.primary,
    fontSize: fontSize(18),
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameContainer: {
    fontSize: fontSize(20),
    color: colors.primary,
    fontWeight: '700',
  },
  fullName: {
    fontSize: fontSize(13),
    marginTop: spacing(3),
    color: colors.greyBlue,
  },
});

export default Profile;
