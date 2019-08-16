import React, { PureComponent } from 'react';
import { StatusBar, View } from '../../base';
import styles from './background-view.styles';

type Props = {
  backgroundColor: string,
};

export default class BackgroundView extends PureComponent<Props> {
  getBarStyle = hex => {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }

    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    if (hex.length !== 6) {
      return 'default';
    }

    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);

    return r * 0.299 + g * 0.587 + b * 0.114 > 186
      ? 'dark-content'
      : 'light-content';
  };

  render() {
    const {
      backgroundColor,
      headerBackgroundColor,
      style,
      children,
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (backgroundColor) containerStyles.push({ backgroundColor });

    const headerBackdropStyles = [styles.headerBackdrop];
    if (headerBackgroundColor)
      headerBackdropStyles.push({ backgroundColor: headerBackgroundColor });

    return (
      <View style={containerStyles}>
        <StatusBar
          backgroundColor={headerBackgroundColor}
          barStyle={this.getBarStyle(headerBackgroundColor)}
        />
        <View style={headerBackdropStyles} />
        {children}
      </View>
    );
  }
}
