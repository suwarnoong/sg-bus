// @flow
import * as React from 'react';
import { View } from '../native';
import { Label as LabelInternal } from '../label';
import styles from './text-items.styles';

type Props = {
  texts: Array<any>,
  Label: React.Element,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class TextItems extends React.PureComponent<Props> {
  static defaultProps = {
    Label: LabelInternal
  };

  render() {
    const { style, texts, Label } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        {texts.map((text, index) => (
          <View style={styles.row} key={index}>
            <Label style={styles.index}>{index + 1}.</Label>
            <Label style={styles.desc}>{text}</Label>
          </View>
        ))}
      </View>
    );
  }
}
