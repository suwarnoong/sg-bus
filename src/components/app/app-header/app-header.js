import React, { PureComponent } from 'react';
import { H3, Label, Small, TouchableOpacity, View } from '../../base';
import { ArrowLeftIcon } from '../../../icons';
import { getTextColor } from '../../../utils';
import styles from './app-header.styles';

type Props = {
  title: string,
  subTitle: string,
  backgroundColor: string
};

export default class AppHeader extends PureComponent<Props> {
  renderBackButton = () => {
    const { backgroundColor, back } = this.props;
    const color = getTextColor(backgroundColor);

    return (
      <TouchableOpacity style={styles.leftPanel} onPress={back}>
        <ArrowLeftIcon style={styles.backIcon} size={16} color={color} />
      </TouchableOpacity>
    );
  };

  render() {
    const { title, subTitle, backgroundColor, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (backgroundColor) containerStyles.push({ backgroundColor });

    const color = getTextColor(backgroundColor);
    const titleStyles = [styles.title, { color }];
    const subTitleStyles = [styles.subTitle, { color }];

    return (
      <View style={containerStyles}>
        {this.renderBackButton()}
        <View style={styles.titleContainer}>
          <H3 style={titleStyles}>{title}</H3>
          {!!subTitle && (
            <Small style={subTitleStyles} weight={Label.WEIGHT_MEDIUM}>
              {subTitle}
            </Small>
          )}
        </View>
      </View>
    );
  }
}
