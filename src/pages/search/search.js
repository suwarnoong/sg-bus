// @flow
import * as React from 'react';
import {
  H1,
  Label,
  Button,
  FlatList,
  SearchInput,
  ScreenViewKeyboardAware,
  ScrollView,
  View,
  TextInput
} from '../../components';
import SearchResult from './search-result';
import { SearchIcon, BusIcon } from '../../icons';
import styles from './search.styles';

type Props = {
  search: Function,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class Search extends React.PureComponent<Props> {
  handleSearch = (searchText: string) => {
    this.props.search(searchText);
  };

  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenViewKeyboardAware style={containerStyles}>
        <ScrollView style={styles.scrollView} stickyHeaderIndices={[1]}>
          <View style={styles.infoContainer}>
            <BusIcon style={styles.infoIcon} size={106} color="#FFFFFF" />
            <H1 style={styles.infoTitle}>Looking for a bus?</H1>
            <Label style={styles.infoDesc}>
              Type in the bus stop number or service number.
            </Label>
          </View>
          <View style={styles.searchInputContainer}>
            <SearchInput
              placeholder="Search for bus"
              onSearch={this.handleSearch}
            />
          </View>
          <SearchResult style={styles.searchResult} />
        </ScrollView>
      </ScreenViewKeyboardAware>
    );
  }
}
