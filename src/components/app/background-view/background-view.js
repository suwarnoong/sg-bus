import React, { PureComponent } from 'react';
import { View } from '../../base';
import styles from './background-view.styles';

type Props = {
  backgroundColor: string
};

export default class BackgroundView extends PureComponent<Props> {
  render() {
    const {
      backgroundColor,
      headerBackgroundColor,
      style,
      children
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (backgroundColor) containerStyles.push({ backgroundColor });

    const headerBackdropStyles = [styles.headerBackdrop];
    if (headerBackgroundColor)
      headerBackdropStyles.push({ backgroundColor: headerBackgroundColor });

    return (
      <View style={containerStyles}>
        {children}
        <View style={headerBackdropStyles} />
      </View>
    );
  }
}
