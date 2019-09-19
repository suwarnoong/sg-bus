// @flow
import * as React from 'react';
import NetInfo from '@react-native-community/netinfo';
import i18next from 'i18next';
import { Label, View } from '../../base';
import styles from './offline-notice.styles';

type Props = {
  isOnline: boolean,
  updateIsOnline: Function,
  style?: { [string]: mixed },
  children?: React.Node,
};

export default class OfflineNotice extends React.PureComponent<Props> {
  unsubscribe: Function;

  componentDidMount() {
    setTimeout(() => {
      this.unsubscribe = NetInfo.addEventListener(state => {
        const { isInternetReachable } = state;
        this.props.updateIsOnline(isInternetReachable);
      });
    }, 2000);
  }

  componentWillUnmount() {
    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe();
    }
  }

  render() {
    const { style, showOfflineNotice, isOnline } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    if (!showOfflineNotice) return null;
    if (isOnline) return null;

    return (
      <View style={containerStyles}>
        <Label style={styles.label}>{i18next.t('offlineMessage')} </Label>
      </View>
    );
  }
}
