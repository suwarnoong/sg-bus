// @flow
import * as React from 'react';
import i18next from 'i18next';
import { Button, View } from '../../base';
import { SettingsIcon } from '../../../icons';
import styles from './app-controller.styles';

type Props = {
  showSettings: Boolean,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class AppController extends React.PureComponent<Props> {
  render() {
    const { style, navigate, showSettings } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    if (!showSettings) return null;

    return (
      <View style={containerStyles}>
        <Button
          Icon={SettingsIcon}
          type={Button.TYPE_CLEAR}
          iconSize={24}
          onPress={() => {
            navigate('Settings', { title: i18next.t('settings') });
          }}
        />
      </View>
    );
  }
}
