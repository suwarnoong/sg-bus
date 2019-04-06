import React, { PureComponent } from 'react';
import { TextInput as NativeTextInput, View } from 'react-native';
import styles from './text-input.styles';

type Props = {
  placeholder: string
};

export default class TextInput extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  handleFocus = () => {};

  handleBlur = () => {};

  render() {
    const { style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <NativeTextInput
          style={styles.input}
          ref={r => {
            this.input = r;
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...this.props}
        />
      </View>
    );
  }
}
