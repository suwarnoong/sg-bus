//@flow
import * as React from 'react';
import { UIManager, TextInput } from 'react-native';
import {
  Animated,
  LayoutChangeEvent,
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  ScrollView,
  View
} from '../../base';
import { ScreenView } from '../screen-view';
import styles from './screen-view-keyboard-aware.styles';

const { State: TextInputState } = TextInput;

type Props = {
  style?: { [string]: mixed },
  children?: React.Node
};

type State = {
  viewHeight: number | string,
  scrollTo: number
};

export default class ScreenViewKeyboardAware extends React.PureComponent<
  Props,
  State
> {
  scrollView: ScrollView;
  scrollTop: number = 0;
  viewOriginHeight: number;
  kbShow: EmitterSubscription;
  kbHide: EmitterSubscription;

  constructor(props: Props) {
    super(props);
    this.state = {
      viewHeight: 'auto',
      scrollTo: 0
    };
  }

  componentWillMount() {
    this.kbShow = Keyboard.addListener('keyboardWillShow', this.keyboardShow);
    this.kbHide = Keyboard.addListener('keyboardWillHide', this.keyboardHide);
  }

  componentWillUnmount() {
    this.kbShow.remove();
    this.kbHide.remove();
  }

  keyboardShow = (event: KeyboardEvent) => {
    const {
      height: keyboardHeight,
      screenY: availableHeight
    } = event.endCoordinates;

    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    if (!currentlyFocusedField) return;

    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = availableHeight - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }

        this.setState({
          scrollTo: this.scrollTop - gap + 30,
          viewHeight: this.viewOriginHeight + keyboardHeight
        });
      }
    );
  };

  keyboardHide = (event: KeyboardEvent) => {
    this.setState({ viewHeight: this.viewOriginHeight, scrollTo: 0 });
  };

  handleScroll = (event: any) => {
    this.scrollTop = event.nativeEvent.contentOffset.y;
  };

  handleLayout = (event: LayoutChangeEvent) => {
    if (!this.viewOriginHeight) {
      this.viewOriginHeight = event.nativeEvent.layout.height;
    }

    if (!this.scrollView) return;
    if (this.state.scrollTo <= 0) return;

    this.scrollView.scrollTo({
      x: 0,
      y: this.state.scrollTo
    });
  };

  render() {
    const { viewHeight } = this.state;
    const { style, children } = this.props;

    const containerStyles = [styles.container, { flex: 1 }];
    if (style) containerStyles.push(style);

    return (
      <ScreenView
        style={containerStyles}
        scrollable={true}
        onScroll={this.handleScroll}
        scrollEventThrottle={16}
        containerRef={c => (this.scrollView = c)}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={{ flex: 1, height: viewHeight }}
          onLayout={this.handleLayout}
        >
          {children}
        </View>
      </ScreenView>
    );
  }
}
