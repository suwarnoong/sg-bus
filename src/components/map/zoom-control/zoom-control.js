// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import styles from './zoom-control.styles';
import { Button, ButtonGroup } from '../../base';
import { AddIcon, MinusIcon } from '../../../icons';

type Props = {
  zoomLevel: number,
  maxZoomLevel: number,
  minZoomLevel: number,
  onZoom: Function,
  style: { [string]: mixed },
  children: Node
};

type State = {
  currentZoom: number
};

export default class ZoomControl extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentZoom: props.zoomLevel
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.zoomLevel !== nextProps.zoomLevel) {
      this.setState({ currentZoom: nextProps.zoomLevel });
    }
  }

  handleZoom = (isZoomIn: boolean) => {
    const { onZoom, minZoomLevel, maxZoomLevel } = this.props;
    let { currentZoom } = this.state;

    if (isZoomIn && currentZoom === maxZoomLevel) return;
    if (!isZoomIn && currentZoom === minZoomLevel) return;

    currentZoom = currentZoom + (isZoomIn ? 1 : -1);
    this.setState({ currentZoom });

    if (typeof onZoom === 'function') {
      onZoom(currentZoom);
    }
  };

  render() {
    const { minZoomLevel, maxZoomLevel, style } = this.props;
    const { currentZoom } = this.state;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ButtonGroup style={containerStyles}>
        <Button
          Icon={AddIcon}
          type={Button.TYPE_CLEAR}
          iconSize={16}
          onPress={() => this.handleZoom(true)}
          disabled={currentZoom === maxZoomLevel}
        />
        <Button
          Icon={MinusIcon}
          type={Button.TYPE_CLEAR}
          iconSize={16}
          onPress={() => this.handleZoom(false)}
          disabled={currentZoom === minZoomLevel}
        />
      </ButtonGroup>
    );
  }
}
