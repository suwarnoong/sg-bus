// @flow
import * as React from 'react';
import i18next from 'i18next';
import { Button, Loader, H1, H2, ScreenView, View } from '../../components';
import { languages } from '../../constants';
import styles from './settings.styles';

type Props = {
  back: Function,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class Settings extends React.PureComponent<Props> {
  translate = require('../../assets/translate.json');

  handleLanguage = (lang: { key: string, value: string }) => {
    const { back } = this.props;
    i18next.changeLanguage(lang.key);
    back();
  };

  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles} scrollable={true}>
        <View style={styles.infoContainer}>
          <View style={styles.infoIconMask}>
            <Loader
              source={this.translate}
              speed={0.5}
              style={styles.infoIcon}
            />
          </View>
          <H1 style={styles.infoTitle}>{i18next.t('chooseLanguage')}</H1>
        </View>
        <View style={styles.languageContainer}>
          {languages.map(l => (
            <Button
              key={l.key}
              label={l.value}
              type={Button.TYPE_PLAIN}
              labelStyle={styles.languageLabel}
              style={styles.languageOption}
              onPress={() => this.handleLanguage(l)}
            />
          ))}
        </View>
      </ScreenView>
    );
  }
}
