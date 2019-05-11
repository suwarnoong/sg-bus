import React, { PureComponent } from 'react';
import ServiceStop from './service-stop';
import { Card, Label, SectionList, View } from '../../base';
import { IBusArrival } from '../../../types.d';
import styles from './service-stop-list.styles';

import pick from 'lodash/fp/pick';

type Props = {
  Container: React.Element,
  favoriteServiceStop: Array<{
    serviceNo: string,
    busStopCode: string,
    roadName: string,
    description: string,
    distance: number
  }>,
  onPress: Function
};

export default class ServiceStopList extends PureComponent<Props> {
  static defaultProps = {
    Container: View
  };

  keyExtractor = (item, index) => `${item.busStopCode}|${item.serviceNo}`;

  renderSectionHeader = ({ section: { name } }) => {
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
  };

  renderItem = ({ item, index, section }) => {
    const itemContainerStyles = [styles.itemContainer];
    if (index === 0) itemContainerStyles.push(styles.firstItemContainer);
    if (index === section.data.length - 1)
      itemContainerStyles.push(styles.lastItemContainer);

    return (
      <View style={itemContainerStyles}>
        <ServiceStop {...item} onPress={this.props.onPress} />
      </View>
    );
  };

  render() {
    const { Container, favoriteServiceStop, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles}>
        <SectionList
          sections={favoriteServiceStop}
          keyExtractor={this.keyExtractor}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}
