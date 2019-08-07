// @flow
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import i18next from 'i18next';
import { Button, View } from '../../base';
import { SettingsIcon } from '../../../icons';
import styles from './app-controller.styles';

type Props = {
  showSettings: Boolean,
  navigate: Function,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class AppController extends React.PureComponent<Props> {
  render() {
    const { navigate, showSettings } = this.props;

    if (!showSettings) return null;

    return (
      <SafeAreaView style={styles.container}>
        <Button
          Icon={SettingsIcon}
          type={Button.TYPE_CLEAR}
          iconSize={24}
          style={styles.button}
          onPress={() => {
            navigate('Settings', { title: i18next.t('settings') });
          }}
        />
      </SafeAreaView>
    );
  }
}
