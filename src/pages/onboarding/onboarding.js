// @flow
import * as React from 'react';
import { Label, ScreenView } from '../../components';
import styles from './onboarding.styles';

type Props = {
  style?: { [string]: mixed },
  children?: React.Node
};

export default class Onboarding extends React.PureComponent<Props> {
  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <ScreenView style={containerStyles}>
        <Label>Onboarding rendered</Label>
      </ScreenView>
    );
  }
}
