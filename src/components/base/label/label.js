import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './label.styles.js';

type Props = {
  size: string,
};

const sizeMap = {
  'xxsmall': 8,
  'xsmall': 10,
  'small': 12,
  'medium': 14,
  'large': 16,
  'xlarge': 18,
  'xxlarge': 20,
};

export default class Label extends PureComponent<Props> {
  render() {
    const { size, style, children } = this.props;

    let textStyles = [];
    if (style) textStyles.push(style);
    if (size && sizeMap[size]) textStyles.push({ fontSize: sizeMap[size] });

    return (
      <Text {...this.props} style={textStyles}>{children}</Text>
    );
  }
}