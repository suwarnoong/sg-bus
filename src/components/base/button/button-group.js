import React, { PureComponent } from 'react';
import Button from './button';
import { View } from '../native';
import styles from './button-group.styles';
import buttonStyles from './button.styles';

type Props = {
  type: string
};

export default class ButtonGroup extends PureComponent<Props> {
  static defaultProps = {
    type: Button.TYPE_PLAIN
  };

  renderButtons = () => {
    const { children, type } = this.props;

    if (children == null) return;

    return React.Children.map(children, (child, index) => {
      const childStyles = [styles.button];
      if (index === 0) childStyles.push(styles.firstButton);
      if (index === children.length - 1 || children.length == null)
        childStyles.push(styles.lastButton);

      if (child.props.style) childStyles.push(child.props.style);

      return React.cloneElement(child, {
        style: childStyles,
        type
      });
    });
  };

  render() {
    const { style, type } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (type) containerStyles.push(buttonStyles[`${type}Container`]);

    return <View style={containerStyles}>{this.renderButtons()}</View>;
  }
}
