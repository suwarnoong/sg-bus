import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './card.styles.js';

type Props = {
  color: string
};

export default class Card extends PureComponent<Props> {
  render() {
    const { color, children, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (color) containerStyles.push({ backgroundColor: color });

    return <View style={containerStyles}>{children}</View>;
  }
}
