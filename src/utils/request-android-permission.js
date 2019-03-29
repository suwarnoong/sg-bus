import { PermissionsAndroid, Platform } from 'react-native';

export default async (permission, title, message) => {
  if (!(Platform.OS === 'android' && Platform.Version >= 23)) return true;

  try {
    const granted = await PermissionsAndroid.request(permission, {
      title: 'Location Permission',
      message:
        'SG Bus needs to know your location for scanning nearest bus stops.'
    });

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(`Permission ${permission} Granted`);
    } else {
      console.log(`Permission ${typeof permission} Denied`);
    }

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
  }
};
