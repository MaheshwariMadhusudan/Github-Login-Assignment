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
import {
  fontSize,
  fonts,
  colors,
  spacing,
  rgbaColor,
  scales,
} from '../../constants/appStyles';
import Header from '../../components/Header';
import {useUserInfo} from '../../contexts/userInfo';
import ProfileImage from '../../components/ProfileImage';

const Home = props => {
  const {navigation} = props;
  const {userCode, setUserCode, accessToken, setAccessToken} = useUserInfo();
  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    axios
      .get(`https://api.github.com/user`, {
        headers: headers,
      })
      .then(response => {
        setProfileDetails(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title="Profile" showBackButton={false} />
        <View style={styles.profileContainer}>
          <View>
            <ProfileImage imageUrl={profileDetails.avatar_url} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.userNameContainer}>{profileDetails.login}</Text>
            <Text>{profileDetails.name}</Text>
          </View>
        </View>
      </View>
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
});

export default Home;
