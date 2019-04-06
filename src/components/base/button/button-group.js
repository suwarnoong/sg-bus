import React, { PureComponent } from 'react';
import { View } from '../native';
import styles from './button-group.styles';

type Props = {};

export default class ButtonGroup extends PureComponent<Props> {
  renderButtons = () => {
    const { children } = this.props;

    if (children == null) return;

    return React.Children.map(children, (child, index) => {
      const childStyles = [styles.button];
      if (index === 0) {
        childStyles.push(styles.firstButton);
      } else if (index === children.length - 1) {
        childStyles.push(styles.lastButton);
      }

      if (child.props.style) {
        childStyles.push(child.props.style);
      }

      return React.cloneElement(child, {
        style: childStyles
      });
    });
  };

  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return <View style={containerStyles}>{this.renderButtons()}</View>;
  }
}
