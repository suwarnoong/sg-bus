import React, { PureComponent } from 'react';
import { H2, Label, TouchableOpacity, View } from '../../base';
import { ChevronLeftIcon } from '../../../icons';
import styles from './app-header.styles.js';

type Props = {
  title: string
};

export default class AppHeader extends PureComponent<Props> {
  renderBackButton = () => {
    return (
      <TouchableOpacity style={styles.leftPanel} onPress={this.props.back}>
        <ChevronLeftIcon style={styles.backIcon} size={20} color="#FFFFFF" />
        <Label style={[styles.backText]} size={Label.SIZE_SMALL}>
          Back
        </Label>
      </TouchableOpacity>
    );
  };

  render() {
    const { title, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        {this.renderBackButton()}
        <View style={styles.titleContainer}>
          <H2 style={styles.title}>{title}</H2>
        </View>
      </View>
    );
  }
}
