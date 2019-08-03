// @flow
import * as React from 'react';
import i18next from 'i18next';
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
import { ICoordinate } from '../../types.d';
import styles from './search.styles';

type Props = {
  search: Function,
  geolocation: ICoordinate,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class Search extends React.PureComponent<Props> {
  handleSearch = (searchText: string) => {
    const { geolocation } = this.props;
    this.props.search(searchText, geolocation);
  };

  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenViewKeyboardAware style={containerStyles}>
        <ScrollView style={styles.scrollView} stickyHeaderIndices={[1]}>
          <View style={styles.infoContainer}>
            <BusIcon style={styles.infoIcon} size={106} color="#1289A7" />
            <H1 style={styles.infoTitle}>{i18next.t('searchTitle')}</H1>
            <Label style={styles.infoDesc}>{i18next.t('searchDesc')}</Label>
          </View>
          <View style={styles.searchInputContainer}>
            <SearchInput
              placeholder={i18next.t('searchInputPlaceholder')}
              buttonLabel={i18next.t('search')}
              onSearch={this.handleSearch}
            />
          </View>
          <SearchResult style={styles.searchResult} />
        </ScrollView>
      </ScreenViewKeyboardAware>
    );
  }
}
