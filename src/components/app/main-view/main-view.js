import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View } from '../../base';
import styles from './main-view.styles';

type Props = {
  inset: string
};

export default class MainView extends PureComponent<Props> {
  getForceInset() {
    const { inset } = this.props;
    const forceInset = {};

    for (prop in inset) {
      if (inset[prop] === true || inset[prop] === false) {
        forceInset[prop] = inset[prop] ? 'always' : 'never';
      }
    }

    return forceInset;
  }

  render() {
    const { style, children } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <SafeAreaView style={containerStyles} forceInset={this.getForceInset()}>
        {children}
      </SafeAreaView>
    );
  }
}
