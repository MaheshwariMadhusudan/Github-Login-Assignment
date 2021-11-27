import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {scales} from '../../constants/appStyles';

const ProfileImage = props => {
  const {imageUrl, containerStyles, profileImageStyles} = props;
  return (
    <View style={{...styles.container, ...containerStyles}}>
      <Image
        source={{uri: imageUrl}}
        resizeMode="contain"
        style={{...styles.profileImage, ...profileImageStyles}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scales(60),
    width: scales(60),
    alignItems: 'center',
    borderRadius: scales(30),
  },
  profileImage: {
    height: scales(60),
    width: scales(60),
    borderRadius: scales(30),
  },
});

export default ProfileImage;
