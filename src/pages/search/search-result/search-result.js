// @flow
import * as React from 'react';
import i18next from 'i18next';
import {
  BusStopList,
  BusServiceList,
  FlatList,
  H1,
  Label,
  View
} from '../../../components';
import { IBusStop, IBusService, IFound } from '../../../types.d';
import styles from './search-result.styles';

type Props = {
  found: IFound,
  stopsByStop: Array<mixed>,
  navigate: Function,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class SearchResult extends React.PureComponent<Props> {
  renderResultText = (items: Array<any>) => {
    return i18next.t('countResult', { count: items.length });
  };

  renderBusStops = (stops: Array<IBusStop>) => {
    if (!stops) return null;

    return (
      <View style={styles.busStopsContainer}>
        <View style={styles.titleContainer}>
          <H1 style={styles.title}>{i18next.t('busStops')}</H1>
          <Label style={styles.resultCount}>
            {this.renderResultText(stops)}
          </Label>
        </View>
        <BusStopList
          style={{ margin: 0 }}
          list={stops}
          onPress={item => {
            this.props.navigate('BusStopArrivals', {
              title: item.description,
              subTitle: `${item.roadName}    ${item.busStopCode}`,
              busStopCode: item.busStopCode
            });
          }}
        />
      </View>
    );
  };

  renderBusServices = (services: Array<IBusService>) => {
    if (!services) return null;

    return (
      <View style={styles.busServicesContainer}>
        <View style={styles.titleContainer}>
          <H1 style={styles.title}>{i18next.t('busServices')}</H1>
          <Label style={styles.resultCount}>
            {this.renderResultText(services)}
          </Label>
        </View>
        <BusServiceList style={{ margin: 0 }} list={services} />
      </View>
    );
  };

  render() {
    const { found, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        {this.renderBusStops(found.stop)}
        {this.renderBusServices(found.service)}
      </View>
    );
  }
}
