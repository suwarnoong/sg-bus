import React, { PureComponent } from 'react';
import Button from './button';

export const ToolbarItem = props => (
  <Button
    {...props}
    iconPlacement={Button.ICON_PLACEMENT_TOP}
    iconSize={36}
    labelStyle={{ fontSize: 12 }}
    type={Button.TYPE_CLEAR}
  />
);

export const ButtonIconLeft = props => (
  <Button {...props} iconPlacement={Button.ICON_PLACEMENT_LEFT} />
);

export const ButtonIconRight = props => (
  <Button {...props} iconPlacement={Button.ICON_PLACEMENT_RIGHT} />
);
