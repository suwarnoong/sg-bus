// @flow
import * as React from 'react';
import { View } from '../../base';
import styles from './vbox.styles';

type Props = {
  style?: { [string]: mixed },
  children?: React.Node
};

export default class VBox extends React.PureComponent<Props> {
  render() {
    const { style, children } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const sizeOfChildren = children.length;

    return (
      <View style={containerStyles}>
        {children.map((element, index) =>
          React.cloneElement(element, {
            key: index,
            style: {
              margin: 10,
              marginBottom: index === sizeOfChildren - 1 ? 10 : 0
            }
          })
        )}
      </View>
    );
  }
}
