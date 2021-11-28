// All the App styles go here
import {Dimensions, Platform, StatusBar, PixelRatio} from 'react-native';
import {getStatusBarHeight} from '../utils/isIphoneX';

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const colors = {
  // exporting colors with hexadecimal codes
  primary: '#007F80',
  greyOne: '#668f9bb3',
  white: '#FFFFFF',
  black: 'black',
  greyBlue: '#060819',
};

export const isIphoneX = () => {
  // checking if the device is IPhone X
  const dimen = Dimensions.get('window');
  return (
    isIos &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
};

export const isIphone6 = () => {
  // checking if the device is IPhone 6
  const dimen = Dimensions.get('window');
  return dimen.height > 600 && dimen.height < 750;
};

const widthPercentageToDP = (
  // conerting the width to dp
  iphoneWidthPercent,
  androidWidthPercent = iphoneWidthPercent,
) => {
  let elemWidth;
  if (typeof iphoneWidthPercent === 'number') {
    elemWidth = isIos ? iphoneWidthPercent : androidWidthPercent;
  } else {
    elemWidth = isIos
      ? parseFloat(iphoneWidthPercent)
      : parseFloat(androidWidthPercent);
  }
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

export const HeightPercentageToDP = (
  // converting height to dp
  iphoneHeightPercent,
  androidHeightPercent = iphoneHeightPercent,
) => {
  let elemHeight;
  if (typeof iphoneHeightPercent === 'number') {
    elemHeight = isIos ? iphoneHeightPercent : androidHeightPercent;
  } else {
    elemHeight = isIos
      ? parseFloat(iphoneHeightPercent)
      : parseFloat(androidHeightPercent);
  }
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

export const deviceDimensions = {
  // exporting device dimensions
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  WPTDP: widthPercentageToDP,
  HPTDP: HeightPercentageToDP,
  WHRatio: SCREEN_WIDTH / SCREEN_HEIGHT,
};

export const heiWidScale = 0.125;

export const scales = (size, type = 'height') => {
  // exporting scaling for height and width
  if (type === 'height') {
    return deviceDimensions.HPTDP(heiWidScale * size);
  }
  return deviceDimensions.WPTDP(heiWidScale * size);
};

const iphoneXBottomSpace = scales(35);

export const dimensions = {
  statusBar: getStatusBar(),
  topExtraSpace: 6,
  topSpace: getStatusBar() + 6,
  roundBtnHeight:
    Math.min(deviceDimensions.height, deviceDimensions.width) * 0.2,
  bottomButtonHeight: 60,
  numKeyboardHeight: deviceDimensions.height * 0.67,
  iphoneXBottomSpace,
  tabBarHeight: deviceDimensions.HPTDP(isIphoneX() ? '7.5%' : '10%', '10%'),
  safeHeight:
    deviceDimensions.height -
    getStatusBar() -
    (isIphoneX() ? iphoneXBottomSpace : 0),
  BottomtabBarHeight: isIphoneX() ? '12.5%' : '11%',
};

function getStatusBar() {
  return !isIos ? StatusBar.currentHeight : getStatusBarHeight();
}

export const fontScale = 0.123;

export const fontSize = size => deviceDimensions.HPTDP(fontScale * size);

export const marginPaddingScale = 0.125;

export const spacing = size =>
  deviceDimensions.HPTDP(marginPaddingScale * size);

export const verticalScale = size => {
  const percentage = (size * 100) / 776;
  return (SCREEN_HEIGHT * percentage) / 100;
};

export const horizontalScale = size => {
  const percentage = (size * 100) / 320;
  return (SCREEN_WIDTH * percentage) / 100;
};
