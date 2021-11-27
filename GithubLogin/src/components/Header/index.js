import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import {scales, colors, spacing, fontSize} from '../../constants/appStyles';
import {back} from '../../../assets';

const BackButtonComponent = ({onBackPress}) => {
  return (
    <TouchableOpacity onPress={onBackPress}>
      <Image source={back} resizeMode="contain" style={styles.backIcon} />
    </TouchableOpacity>
  );
};

const Header = props => {
  const {
    title,
    containerStyles,
    titleTextStyles,
    showBackButton = true,
    onBackPress = () => {},
  } = props;
  return (
    <View style={{...styles.container, ...containerStyles}}>
      {showBackButton && <BackButtonComponent onBackPress={onBackPress} />}
      <Text style={{...styles.titleText, ...titleTextStyles}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.primary,
    height: scales(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    marginLeft: spacing(20),
    fontSize: fontSize(24),
    fontWeight: '700',
  },
  backIcon: {
    height: scales(18),
    width: scales(30),
    marginLeft: spacing(10),
  },
});

export default Header;
