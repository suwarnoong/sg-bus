// @flow
import * as React from 'react';
import { H1, Label, ScreenView, View, TextInput } from '../../components';
import { SearchIcon, BusIcon } from '../../icons';
import styles from './search.styles';

type Props = {
  style?: { [string]: mixed },
  children?: React.Node
};

export default class Search extends React.PureComponent<Props> {
  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles}>
        <View style={styles.infoContainer}>
          <BusIcon style={styles.infoIcon} size={106} color="#FFFFFF" />
          <H1 style={styles.infoTitle}>Looking for a bus?</H1>
          <Label style={styles.infoDesc}>
            Type in the bus stop number or service number.
          </Label>
        </View>
        <TextInput
          IconBefore={
            <SearchIcon size={24} color="#1298A7" style={{ marginRight: 5 }} />
          }
          placeholder="Search"
        />
        <View style={styles.bottomContainer} />
      </ScreenView>
    );
  }
}
