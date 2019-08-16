import React, { PureComponent } from 'react';
import { View } from '../native';
import styles from './card.styles';

type Props = {
  color: string,
  padding: number,
  shadow: boolean,
  onLayout: Function,
};

export default class Card extends PureComponent<Props> {
  static defaultProps = {
    padding: 20,
  };

  render() {
    const { color, padding, shadow, children, style, onLayout } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (color) containerStyles.push({ backgroundColor: color });
    if (padding) containerStyles.push({ padding });
    if (shadow) containerStyles.push(styles.shadow);

    return (
      <View style={containerStyles} onLayout={onLayout}>
        {children}
      </View>
    );
  }
}
