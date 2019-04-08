import React, { PureComponent } from 'react';
import ServiceStop from './service-stop';
import { Card, Label, SectionList, View } from '../../base';
import { IBusArrival } from '../../../types.d';
import styles from './service-stop-list.styles';

import pick from 'lodash/fp/pick';

type Props = {
  Container: React.Element,
  list: Array<{
    serviceNo: string,
    busStopCode: string,
    roadName: string,
    description: string,
    distance: number
  }>,
  arrivals: Array<IBusArrival>,
  onPress: Function
};

export default class ServiceStopList extends PureComponent<Props> {
  static defaultProps = {
    Container: View
  };

  handlePress = item => {
    const { onPress } = this.props;
    if (typeof onPress === 'function') {
      onPress(item);
    }
  };

  render() {
    const { Container, list, arrivals, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles}>
        <SectionList
          sections={list}
          keyExtractor={(item, index) =>
            `${item.busStopCode}|${item.serviceNo}`
          }
          renderSectionHeader={({ section: { name } }) => {
            return (
              <View style={styles.sectionHeader}>
                <Label
                  weight={Label.WEIGHT_DEMI_BOLD}
                  size={Label.SIZE_LARGE}
                  style={styles.sectionTitle}
                >
                  {name}
                </Label>
              </View>
            );
          }}
          renderItem={({ item, index, section }) => {
            const busArrival =
              arrivals &&
              arrivals[item.busStopCode] &&
              arrivals[item.busStopCode].find(
                a => a.serviceNo === item.serviceNo
              );

            const itemContainerStyles = [styles.itemContainer];
            if (index === 0)
              itemContainerStyles.push(styles.firstItemContainer);
            if (index === section.data.length - 1)
              itemContainerStyles.push(styles.lastItemContainer);

            return (
              <View style={itemContainerStyles}>
                <ServiceStop
                  {...item}
                  arrivals={busArrival}
                  onPress={() => this.handlePress(item)}
                />
              </View>
            );
          }}
        />
      </Container>
    );
  }
}