import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './label.styles.js';

type Props = {
  size: string,
};

const sizeMap = {
  'small': 10,
  'medium': 14,
  'large': 18,
  'xlarge': 22,
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