import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const top = DeviceInfo.hasNotch() ? 44 : 0;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: top + 5,
    right: 15
  }
});
