import React, { PureComponent } from 'react';
import { View } from '../native';
import styles from './card.styles.js';

type Props = {
  color: string,
  padding: number
};

export default class Card extends PureComponent<Props> {
  static defaultProps = {
    padding: 20
  };

  render() {
    const { color, padding, children, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (color) containerStyles.push({ backgroundColor: color });
    if (padding) containerStyles.push({ padding });

    return <View style={containerStyles}>{children}</View>;
  }
}
