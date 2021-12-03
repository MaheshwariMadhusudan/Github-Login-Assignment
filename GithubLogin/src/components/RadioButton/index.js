import React from 'react';
import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {emptyRadioCircle, filledRadioCircle} from '../../../assets';
import {colors, fontSize, scales, spacing} from '../../constants/appStyles';

const RadioButton = props => {
  const {
    isSelected,
    label,
    containerStyle,
    buttonContainerStyle,
    onPress,
    buttonStyle,
  } = props;
  const selectedLabelStyle = isSelected ? styles.selectedLabel : {}; // radiobutton selection flag

  const getLabelStyles = () =>
    // styles for radio button label
    ({
      ...styles.label,
      ...selectedLabelStyle,
      ...props.labelStyle,
    });

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <TouchableOpacity
        style={{...styles.buttonContainer, ...buttonContainerStyle}}
        onPress={() => onPress(label)} // funtion to be triggered when button is pressed
      >
        {/* radio button image */}
        <Image
          source={isSelected ? filledRadioCircle : emptyRadioCircle}
          style={{...styles.button, ...buttonStyle}}
          resizeMode="contain"
        />
        {/* radio button label */}
        <Text style={{...getLabelStyles()}}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // styles for the component
  container: {
    width: '40%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  label: {
    color: colors.greyFour,
    marginLeft: spacing(8),
    fontSize: fontSize(15),
  },
  selectedLabel: {
    color: colors.greenOne,
    marginLeft: spacing(8),
    fontSize: fontSize(15),
  },
  button: {
    height: scales(14, 'height'),
    width: scales(14),
  },
});

export default RadioButton;
