import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  fontSize,
  fonts,
  colors,
  spacing,
  rgbaColor,
  scales,
} from '../../constants/appStyles';

const Home = props => {
  const {navigation} = props;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen</Text>
      </View>
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

export default Home;
