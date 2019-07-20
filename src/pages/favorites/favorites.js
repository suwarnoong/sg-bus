import React, { PureComponent } from 'react';
import { H1, ScreenView } from '../../components';
import NearestFavorites from './nearest-favorites';
import styles from './favorites.styles';

type Props = {
  style: { [string]: mixed }
};

export default class Favorites extends PureComponent<Props> {
  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles} scrollable={true}>
        <NearestFavorites />
      </ScreenView>
    );
  }
}
