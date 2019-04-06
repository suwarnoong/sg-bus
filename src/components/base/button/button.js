import React, { PureComponent } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { Label } from '../label';
import { View, TouchableOpacity } from '../native';
import styles from './button.styles';

type Props = {
  label: string,
  labelStyle: TextStyle,
  onPress: Function,
  disabled: boolean,
  type: string,
  Icon: React.ReactElement,
  iconPlacement: string,
  iconSize: number,
  style: ViewStyle
};

export default class Button extends PureComponent<Props> {
  static TYPE_DEFAULT = 'default';
  static TYPE_PLAIN = 'plain';
  static TYPE_CLEAR = 'clear';
  static TYPE_WARNING = 'warning';
  static TYPE_DANGER = 'danger';

  static ICON_PLACEMENT_LEFT = 'left';
  static ICON_PLACEMENT_RIGHT = 'right';
  static ICON_PLACEMENT_TOP = 'top';

  static defaultProps = {
    type: 'default', // TYPE_DEFAULT
    iconPlacement: 'left', // ICON_PLACEMENT_LEFT
    iconSize: 16
  };

  handlePress = _ => {
    const { disabled, onPress } = this.props;

    if (onPress && !disabled) {
      onPress();
    }
  };

  renderIcon = _ => {
    const { disabled, Icon, iconPlacement, iconSize, type } = this.props;
    const iconStyles = [styles.icon, styles[`${iconPlacement}Icon`]];

    let color = styles.label.color;
    if (type) color = styles[`${type}Label`].color;
    if (disabled) color = styles.disabledLabel.color;

    if (Icon) {
      return (
        <View style={iconStyles}>
          <Icon size={iconSize} color={color} />
        </View>
      );
    }
  };

  renderLabel = _ => {
    const {
      label,
      labelStyle,
      type,
      Icon,
      iconPlacement,
      disabled
    } = this.props;

    const labelStyles = [styles.label];
    if (type) labelStyles.push(styles[`${type}Label`]);
    if (Icon && iconPlacement)
      labelStyles.push(styles[`${iconPlacement}IconLabel`]);
    if (labelStyle) labelStyles.push(labelStyle);
    if (disabled) labelStyles.push(styles['disabledLabel']);

    if (label) {
      return <Label style={labelStyles}>{label}</Label>;
    }
  };

  render() {
    const { type, disabled, iconPlacement, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (type) containerStyles.push(styles[`${type}Container`]);
    if (iconPlacement)
      containerStyles.push(styles[`${iconPlacement}IconContainer`]);

    if (disabled) containerStyles.push(styles['disabledContainer']);

    const isTopOrLeftIcon =
      iconPlacement === Button.ICON_PLACEMENT_LEFT ||
      iconPlacement === Button.ICON_PLACEMENT_TOP;
    const isRightIcon = iconPlacement === Button.ICON_PLACEMENT_RIGHT;

    return (
      <TouchableOpacity
        style={containerStyles}
        disabled={disabled}
        onPress={this.handlePress}
      >
        {isTopOrLeftIcon && this.renderIcon()}
        {this.renderLabel()}
        {isRightIcon && this.renderIcon()}
      </TouchableOpacity>
    );
  }
}
