import React, { PureComponent } from 'react';
import { TextInput as NativeTextInput, View } from 'react-native';
import styles from './text-input.styles';

type Props = {
  placeholder: string,
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

  handleFocus = () => {};

  handleBlur = () => {};

  render() {
    const { IconBefore, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        {this.hasIconBefore && IconBefore}
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
