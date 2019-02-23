import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './background-view.styles.js';

type Props = {
  backgroundColor: string,
};

export default class BackgroundView extends PureComponent<Props> {
  render() {
    const { backgroundColor, style, children } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (backgroundColor) containerStyles.push({ backgroundColor });

    return (
      <View style={containerStyles}>
        {children}
      </View>
    );
  }
}