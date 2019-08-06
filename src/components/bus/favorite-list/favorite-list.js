import React, { PureComponent } from 'react';
import { Label, SectionList, TouchableOpacity, View } from '../../base';
import BusArrival from '../bus-arrival';
import styles from './favorite-list.styles';

type Props = {
  Container: React.Element,
  list: Array<{
    name: string,
    data: Array<mixed>
  }>,
  onPress: Function
};

export default class FavoriteList extends PureComponent<Props> {
  static defaultProps = {
    Container: View
  };

  keyExtractor = (item, index) => `${item.busStopCode}|${item.serviceNo}`;

  renderSectionHeader = ({ section: { name } }) => {
    const { list } = this.props;
    const sectionItem = list.find(s => s.name === name);
    const isFirstSection = list.indexOf(sectionItem) === 0;

    const sectionHeaderStyles = [styles.sectionHeader];
    if (isFirstSection) {
      sectionHeaderStyles.push({ paddingTop: 20 });
    }

    return (
      <View style={sectionHeaderStyles}>
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

  handlePress = item => {
    const { onPress } = this.props;
    if (typeof onPress === 'function') {
      onPress(item);
    }
  };

  renderItem = ({ item, index, section }) => {
    const itemContainerStyles = [styles.itemContainer];
    if (index === 0) itemContainerStyles.push(styles.firstItemContainer);
    if (index === section.data.length - 1)
      itemContainerStyles.push(styles.lastItemContainer);

    const { busStopCode, serviceNo, roadName, description } = item;

    return (
      <View style={itemContainerStyles}>
        <TouchableOpacity
          onPress={() =>
            this.handlePress({ busStopCode, roadName, description })
          }
          delayPressIn={100}
        >
          <BusArrival
            serviceNo={serviceNo}
            busStopCode={busStopCode}
            hideFavorite={true}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { Container, list, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <Container style={containerStyles}>
        <SectionList
          sections={list}
          keyExtractor={this.keyExtractor}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}
