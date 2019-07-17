import React, { PureComponent } from 'react';
import BusService from './bus-service';
import { Card, FlatList, View } from '../../base';
import { IBusService } from '../../../types.d';
import styles from './bus-service-list.styles';

type Props = {
  Container: React.Element,
  list: Array<IBusService>
};

export default class BusServiceList extends PureComponent<Props> {
  static defaultProps = {
    Container: Card
  };

  render() {
    const { Container, list, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles} padding={0}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => `${item.serviceNo}-${item.direction}`}
          renderItem={({ item }) => <BusService {...item} />}
        />
      </Container>
    );
  }
}
