import React, { PureComponent } from 'react';
import styles from './bus-routes.styles.js';
import { Card, FlatList, Label, View } from '../../components';

type Props = {
  params: { [string]: mixed },
  routes: { [string]: Array<mixed> },
  style: { [string]: mixed }
};

export default class BusRoutes extends PureComponent<Props> {
  render() {
    const { routes, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    console.log(routes);

    return (
      <View style={containerStyles}>
        <Card>
          <FlatList
            data={list}
            keyExtractor={(item, index) => item.busStopCode}
            renderItem={({ item }) => (
              <View>
                <Label>{item.busStopCode}</Label>
              </View>
            )}
          />
        </Card>
      </View>
    );
  }
}
