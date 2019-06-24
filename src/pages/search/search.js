// @flow
import * as React from 'react';
import { Label, ScreenView } from '../../components';
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
        <Label>Search rendered</Label>
      </ScreenView>
    );
  }
}
