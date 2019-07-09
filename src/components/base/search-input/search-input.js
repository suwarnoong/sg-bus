// @flow
import * as React from 'react';
import { LayoutAnimation } from 'react-native';
import { Animated, View } from '../native';
import { TextInput } from '../text-input';
import { Button } from '../button';
import { SearchIcon } from '../../../icons';
import styles from './search-input.styles';

type Props = {
  buttonLabel: string,
  placeholder: string,
  onSearch: Function,
  duration: number,
  style?: { [string]: mixed },
  children?: React.Node
};

type State = {
  text: string,
  showSearch: boolean
};

export default class SearchInput extends React.PureComponent<Props, State> {
  static defaultProps = {
    buttonLabel: 'Search',
    placeholder: 'Search',
    duration: 200
  };

  input: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      text: '',
      showSearch: false
    };
  }

  handleChangeText = (text: string) => {
    const showSearch = text.length > 0;
    if (this.state.showSearch !== showSearch) {
      LayoutAnimation.configureNext({
        duration: this.props.duration,
        create: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut
        }
      });
    }
    this.setState({ text, showSearch });
  };

  handlePress = () => {
    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch(this.state.text);
    }
  };

  render() {
    const { buttonLabel, placeholder, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const buttonContainerStyles = [
      styles.buttonContainer,
      this.state.showSearch ? { width: 'auto' } : { width: 0 }
    ];

    return (
      <View style={containerStyles}>
        <TextInput
          ref={r => (this.input = r)}
          style={styles.input}
          onChangeText={this.handleChangeText}
          IconBefore={
            <SearchIcon size={24} color="#1298A7" style={{ marginRight: 5 }} />
          }
          placeholder={placeholder}
        />
        <View style={buttonContainerStyles}>
          <Button label={buttonLabel} onPress={this.handlePress} />
        </View>
      </View>
    );
  }
}
