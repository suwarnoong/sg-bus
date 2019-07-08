import React, { PureComponent } from 'react';
import {
  TextInput as NativeTextInput,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import styles from './text-input.styles';
import { omit } from 'lodash';

type Props = {
  IconBefore: ReactNode
};

export default class TextInput extends PureComponent<Props> {
  hasIconBefore: boolean = false;

  componentWillMount() {
    this.hasIconBefore = this.props.IconBefore != null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.IconBefore !== this.props.IconBefore) {
      this.hasIconBefore = nextProps.IconBefore != null;
    }
  }

  handleContainerPress = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  render() {
    const { IconBefore, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <TouchableWithoutFeedback onPress={this.handleContainerPress}>
        <View style={containerStyles}>
          {this.hasIconBefore && IconBefore}
          <NativeTextInput
            style={styles.input}
            ref={r => (this.input = r)}
            {...omit(this.props, 'style')}
            autoCorrect={false}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
