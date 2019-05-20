// @flow
import * as React from 'react';
import { View } from '../../base';
import styles from './box.styles';

type Props = {
  style?: { [string]: mixed },
  children?: React.Node
};

export default class Box extends React.PureComponent<Props> {
  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return <View style={containerStyles} />;
  }
}
