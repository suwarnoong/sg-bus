// @flow
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import i18next from 'i18next';
import { Label, View } from '../../base';
import { OFFLINE_COLOR } from '../../../constants';
import styles from './offline-notice.styles';

type Props = {
  isOnline: boolean,
  updateIsOnline: Function,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class OfflineNotice extends React.PureComponent<Props> {
  unsubscribe: Function;

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      const { type, isInternetReachable } = state;
      this.props.updateIsOnline(isInternetReachable);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { style, isOnline } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    if (isOnline) return null;

    return (
      <SafeAreaView style={containerStyles}>
        <Label style={styles.label}>{i18next.t('offlineMessage')} </Label>
      </SafeAreaView>
    );
  }
}
