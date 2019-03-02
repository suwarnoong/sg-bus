import React, { PureComponent } from 'react';
import { Label } from '../label';
import { View, TouchableOpacity } from '../native';
import styles from './button.styles.js';

type Props = {
  label: string,
  onPress: Function,
  disabled: boolean,
  type: string,
  Icon: React.ReactElement,
  iconPlacement: string
};

export default class Button extends PureComponent<Props> {
  static TYPE_DEFAULT = 'default';
  static TYPE_PLAIN = 'plain';
  static TYPE_WARNING = 'warning';
  static TYPE_DANGER = 'danger';

  static ICON_PLACEMENT_START = 'start';
  static ICON_PLACEMENT_END = 'end';

  static defaultProps = {
    type: 'default'
  };

  handlePress = _ => {
    const { disabled, onPress } = this.props;

    if (onPress && !disabled) {
      onPress();
    }
  };

  renderIcon = _ => {
    const { Icon } = this.props;
    if (Icon) {
      return (
        <View style={styles.icon}>
          <Icon size={16} />
        </View>
      );
    }
  };

  render() {
    const { label, type, disabled, iconPlacement, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (type) containerStyles.push(styles[`${type}Container`]);

    const labelStyles = [styles.label];
    if (type) labelStyles.push(styles[`${type}Label`]);

    if (disabled) {
      containerStyle.push(styles['disabledContainer']);
      labelStyles.push(styles['disabledLabel']);
    }

    return (
      <TouchableOpacity style={containerStyles} onPress={this.handlePress}>
        {iconPlacement === Button.ICON_PLACEMENT_START && this.renderIcon()}
        <Label style={labelStyles}>{label.toUpperCase()}</Label>
        {iconPlacement === Button.ICON_PLACEMENT_END && this.renderIcon()}
      </TouchableOpacity>
    );
  }
}
