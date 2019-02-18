import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import styles from './label.styles.js';

type Props = {
  size: string | number,
  weight: string,
};

export default class Label extends PureComponent<Props> {
  static WEIGHT_THIN = 'thin';
  static WEIGHT_DEMI_BOLD = 'demi-bold';
  static WEIGHT_BOLD = 'bold';
  static WEIGHT_MEDIUM = 'medium';
  static WEIGHT_NORMAL = 'normal';

  static SIZE_XXSMALL = 'xxsmall';
  static SIZE_XSMALL = 'xsmall';
  static SIZE_SMALL = 'small';
  static SIZE_MEDIUM = 'medium';
  static SIZE_LARGE = 'large';
  static SIZE_XLARGE = 'xlarge';
  static SIZE_XXLARGE = 'xxlarge';

  static defaultProps = {
    size: 'medium',//Label.SIZE_MEDIUM,
    weight: 'normal',//Label.WEIGHT_NORMAL,
  }

  getFontFamily(weight) {
    switch (weight) {
      case Label.WEIGHT_THIN:
        return { fontFamily: 'Avenir-Light' };
      case Label.WEIGHT_DEMI_BOLD:
        return { fontFamily: 'AvenirNext-DemiBold' };
      case Label.WEIGHT_BOLD:
        return { fontFamily: 'AvenirNext-Bold' };
      case Label.WEIGHT_MEDIUM:
        return { fontFamily: 'Avenir-Medium' };
      default:
        return { fontFamily: 'Avenir Next' };
    }
  }

  getSize(size = Label.SIZE_MEDIUM) {
    return typeof size === 'number' ? { fontSize: size } : styles[`${size}`];
  }

  render() {
    const { size, style, children, weight } = this.props;

    let textStyles = [styles.container, this.getFontFamily(weight), this.getSize(size)];
    if (style) textStyles.push(style);

    return (
      <Text {...this.props} style={textStyles}>{children}</Text>
    );
  }
}