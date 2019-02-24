import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './screen-view.styles.js';

type Props = {};

export default class ScreenView extends PureComponent<Props> {
  render() {
    const { backgroundColor, children, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (backgroundColor) containerStyles.push({ backgroundColor });

    return <View style={containerStyles}>{children}</View>;
  }
}
