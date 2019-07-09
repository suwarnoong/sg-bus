// @flow
import * as React from 'react';
import {
  H1,
  Label,
  Button,
  FlatList,
  SearchInput,
  ScreenViewKeyboardAware,
  View,
  TextInput
} from '../../components';
import { SearchIcon, BusIcon } from '../../icons';
import styles from './search.styles';
import { IBusStop, ISearchable } from '../../types.d';

type Props = {
  found: Array<ISearchable>,
  search: Function,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class Search extends React.PureComponent<Props> {
  handleSearch = (searchText: string) => {
    this.props.search(searchText);
  };

  renderItem = ({ item }: any) => {
    if (!item) return null;

    return (
      <View style={{ flexDirection: 'column' }}>
        <Label>{item.name}</Label>
        <Label>{item.description}</Label>
      </View>
    );
  };

  render() {
    const { found, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenViewKeyboardAware style={containerStyles}>
        <View style={styles.infoContainer}>
          <BusIcon style={styles.infoIcon} size={106} color="#FFFFFF" />
          <H1 style={styles.infoTitle}>Looking for a bus?</H1>
          <Label style={styles.infoDesc}>
            Type in the bus stop number or service number.
          </Label>
        </View>
        <SearchInput
          style={styles.searchInput}
          placeholder="Search for bus"
          onSearch={this.handleSearch}
        />
        <FlatList
          style={styles.searchResult}
          data={found}
          scrollEnabled={false}
          keyExtractor={(item, index) => item.key}
          renderItem={this.renderItem}
        />
      </ScreenViewKeyboardAware>
    );
  }
}
