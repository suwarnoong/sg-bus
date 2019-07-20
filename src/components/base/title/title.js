import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import styles from './title.styles';

type Props = {};

export default class Title extends PureComponent<Props> {
  render() {
    const { size, style, children, weight } = this.props;

    let textStyles = [styles.container, { fontWeight: 'bold', fontSize: 26 }];
    if (style) textStyles.push(style);

    return (
      <Text {...this.props} style={textStyles}>
        {children}
      </Text>
    );
  }
}
