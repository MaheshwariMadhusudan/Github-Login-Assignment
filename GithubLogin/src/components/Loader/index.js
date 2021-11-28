import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {spacing} from '../../constants/appStyles';

const Loader = props => {
  const {
    color, // we can specify color of loader
    loadingTxt, // Text to be displayed while loading
    style,
    textStyle,
  } = props;
  let {size} = props;
  size = size || 'large'; // we can specify size of the loader
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {loadingTxt ? (
        <Text style={{...styles.loadingTxt, ...textStyle}} color="white">
          {loadingTxt}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingTxt: {
    marginTop: spacing(5),
  },
});

export default Loader;
