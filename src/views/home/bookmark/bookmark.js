import React, { PureComponent } from 'react';
import { BookmarkList } from '../../../components';
import styles from './bookmark.styles.js';

type Props = {};

export default class Bookmark extends PureComponent<Props> {
  render() {
    const { bookmarks, bookmarksStops, style } = this.props;

    bookmarks.forEach(b => this.props.getArrivals(b.busStopCode));

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <BookmarkList
        list={bookmarks}
        onPress={item => {
          this.props.navigate('BusStopArrivals', {
            title: item.description,
            subTitle: `${item.roadName}    ${item.busStopCode}`,
            busStopCode: item.busStopCode
          });
        }}
        style={containerStyles}
      />
    );
  }
}
