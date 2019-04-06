import React, { PureComponent } from 'react';
import { View } from '../../base';
import styles from './screen-view.styles';

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
