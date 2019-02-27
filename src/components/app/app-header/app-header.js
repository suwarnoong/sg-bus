import React, { PureComponent } from 'react';
import { H3, Label, Small, TouchableOpacity, View } from '../../base';
import { ArrowLeftIcon } from '../../../icons';
import styles from './app-header.styles.js';

type Props = {
  title: string,
  subTitle: string
};

export default class AppHeader extends PureComponent<Props> {
  renderBackButton = () => {
    return (
      <TouchableOpacity style={styles.leftPanel} onPress={this.props.back}>
        <ArrowLeftIcon style={styles.backIcon} size={16} color="#FFFFFF" />
      </TouchableOpacity>
    );
  };

  render() {
    const { title, subTitle, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        {this.renderBackButton()}
        <View style={styles.titleContainer}>
          <H3 style={styles.title}>{title}</H3>
          {!!subTitle && (
            <Small style={styles.subTitle} weight={Label.WEIGHT_MEDIUM}>
              {subTitle}
            </Small>
          )}
        </View>
      </View>
    );
  }
}
