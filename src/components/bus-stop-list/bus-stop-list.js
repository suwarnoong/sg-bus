import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { BusStop } from '../bus-stop';
import { Card } from '../base/card';
import styles from './bus-stop-list.styles.js';

type Props = {
  Wrapper: React.Element,
  list: Array<{
    BusStopCode: string,
    RoadName: string,
    Description: string,
    distance: number,
  }>
};

export default class BusStopList extends PureComponent<Props> {
  static defaultProps = {
    Wrapper: Card,
  }

  render() {
    const { Wrapper, list, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Wrapper style={containerStyles}>
        {
          list && list.map(item => {
            return (
              <BusStop
                key={item.BusStopCode}
                busStopCode={item.BusStopCode}
                description={item.Description}
                roadName={item.RoadName}
                distance={item.distance}
                routes={item.routes}
              />
            );
          })
        }
      </Wrapper>
    );
  }
}