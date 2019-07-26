import React, { PureComponent } from 'react';
import { H1, Title, ScreenView } from '../../components';
import NearestBusStops from './nearest-bus-stops';
import styles from './home.styles';

type Props = {
  getRoutes: () => void,
  getServices: () => void,
  getStops: () => void,
  style: { [string]: mixed }
};

export default class Home extends PureComponent<Props> {
  componentWillMount() {
    this.props.getRoutes();
    this.props.getServices();
    this.props.getStops();
  }

  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles} scrollable={true}>
        <NearestBusStops />
      </ScreenView>
    );
  }
}
