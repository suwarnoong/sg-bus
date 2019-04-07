import React, { PureComponent } from 'react';
import styles from './bus-routes.styles';
import { BusRouteList, ScreenView } from '../../components';

type Props = {
  params: { [string]: mixed },
  routesByService: { [string]: Array<mixed> },
  style: { [string]: mixed }
};

export default class BusRoutes extends PureComponent<Props> {
  render() {
    const {
      persisted,
      routesByService,
      params: { serviceNo },
      style
    } = this.props;

    if (!persisted) return <ScreenView />;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    const routeList = routesByService[serviceNo];

    return (
      <ScreenView style={containerStyles}>
        <BusRouteList
          style={styles.fill}
          list={routeList}
          serviceNo={serviceNo}
        />
      </ScreenView>
    );
  }
}
