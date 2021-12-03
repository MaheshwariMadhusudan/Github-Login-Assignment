import React, {forwardRef} from 'react';
import {TextInput, StyleSheet, View, Image, Text} from 'react-native';
import {colors, fontSize, spacing, scales} from '../../constants/appStyles';

const InputBox = forwardRef((props, ref) => {
  const {label, leftIcon, rightIcon, error, fieldName} = props;

  const errorStyle = error ? styles.errorStyle : {}; // styles in case of error
  const emptyInputBoxStyle = props.value ? {} : styles.emptyInputBoxStyle; // style if input box is empty

  const getContainerStyle = () =>
    // function to get style for the container
    ({
      ...styles.container,
      ...props.inputBoxContainerStyle,
    });

  const getInputContainerStyle = () =>
    // function to get style for the input-container
    ({
      ...styles.inputContainer,
      ...props.inputContainerStyles,
      ...errorStyle,
    });

  const getInputBoxStyle = () =>
    // function to get styles for inputbox
    ({
      ...styles.inputBox,
      ...emptyInputBoxStyle,
      ...props.inputBoxStyle,
    });

  const renderLabel = () => {
    const {labelStyle} = props;
    return <Text style={{...styles.label, ...labelStyle}}>{label}</Text>;
  };

  const renderLeftIcon = () => (
    <Image
      source={leftIcon}
      style={{...styles.leftIcon, ...props.leftIconStyle}}
      resizeMode="contain"
    />
  );

  const renderRightIcon = () => (
    <Image
      source={props.error ? infoCircle : rightIcon}
      style={{...styles.rightIcon, ...props.rightIconStyle}}
      resizeMode="contain"
    />
  );

  const renderTextInput = () => (
    <TextInput
      selectionColor={colors.greenOne}
      allowFontScaling={false} // prop to enable fontscaling
      style={{...getInputBoxStyle()}}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      onChangeText={text => props.onChangeText(text, fieldName)} // prop for onChangeText function
      value={props.value}
      keyboardType={
        // prop to enable keyboard type
        props.keyboardType !== undefined ? props.keyboardType : 'default'
      }
      ref={ref}
      secureTextEntry={props.isPassword}
      editable={props.editable} // prop to enable editing in text input
      maxLength={props.maxLength} // Max allowed length of the input
      multiline={props.multiline} // prop to allow multiline text in the input
      numberOfLines={1}
      autoCapitalize={props.autoCapitalize} // prop to enable autocapitalise
      autoCorrect={props.autoCorrect} // prop to enable autocorrect
      autoFocus={props.autoFocus}
      onSubmitEditing={
        props.onSubmitEditing
          ? () => props.onSubmitEditing(fieldName) // field name is passed to focus next field
          : () => {}
      }
      onBlur={props.onBlur ? props.onBlur : () => {}}
      onFocus={props.onFocus ? () => props.onFocus(fieldName) : () => {}}
      returnKeyType={props.returnKeyType}
      defaultValue={props.defaultValue}
      autoCompleteType="off"
      underlineColorAndroid="transparent"
    />
  );

  return (
    <View style={{...getContainerStyle()}}>
      {/* Label for text input */}
      {renderLabel()}
      <View style={{...getInputContainerStyle()}}>
        {/* Icon to be placed on the left side of the text input */}
        {leftIcon && renderLeftIcon()}
        {/* Text Input */}
        {renderTextInput()}
        {/* Icon to be placed on the right side of the text input */}
        {(props.error || rightIcon) && renderRightIcon()}
      </View>
      {/* Error message to be displayed */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  // styles for the screen
  container: {
    width: '100%',
    alignItems: 'flex-start',
  },
  label: {
    color: colors.greyTwo,
    fontSize: fontSize(15),
  },
  inputContainer: {
    borderWidth: scales(1),
    borderColor: colors.greyBlue,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scales(4),
    paddingHorizontal: spacing(5),
    marginTop: spacing(10),
    height: scales(50, 'height'),
  },
  leftIcon: {
    height: scales(20, 'height'),
    width: scales(20),
    flex: 1,
  },
  rightIcon: {
    height: scales(20, 'height'),
    width: scales(20),
    flex: 1,
  },
  inputBox: {
    fontSize: fontSize(15),
    flex: 9,
  },
  emptyInputBoxStyle: {
    fontSize: fontSize(15),
    flex: 9,
  },
  errorStyle: {
    borderWidth: scales(1),
    borderColor: colors.redTwo,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scales(4),
    paddingHorizontal: spacing(5),
    marginTop: spacing(10),
    height: scales(50, 'height'),
  },
  errorText: {
    color: colors.redTwo,
    fontSize: fontSize(14),
    marginTop: spacing(5),
  },
  optionalLabel: {
    fontSize: fontSize(15),
    color: colors.greyFour,
  },
});

export default InputBox;
