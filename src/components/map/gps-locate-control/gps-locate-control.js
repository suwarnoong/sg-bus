// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { Button, ButtonGroup } from '../../base';
import { GpsLocateIcon } from '../../../icons';
import styles from './gps-locate-control.styles';

type Props = {
  onLocate: Function,
  style: { [string]: mixed },
  children: Node,
};

export default class GPSLocateControl extends PureComponent<Props> {
  handleLocate = () => {
    const { onLocate } = this.props;

    if (typeof onLocate === 'function') {
      onLocate();
    }
  };

  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ButtonGroup style={containerStyles}>
        <Button
          labelStyle={styles.gpsLocate}
          Icon={GpsLocateIcon}
          type={Button.TYPE_PLAIN}
          iconSize={24}
          onPress={this.handleLocate}
        />
      </ButtonGroup>
    );
  }
}
