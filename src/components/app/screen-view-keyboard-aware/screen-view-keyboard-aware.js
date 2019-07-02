//@flow
import * as React from 'react';
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  ScrollView,
  View
} from '../../base';
import { ScreenView } from '../screen-view';
import styles from './screen-view-keyboard-aware.styles';

type Props = {
  style?: { [string]: mixed },
  children?: React.Node
};

export default class ScreenViewKeyboardAware extends React.PureComponent<Props> {
  viewHeight = Dimensions.get('window').height;
  scrollView: ScrollView;
  animHeight: Animated.Value;
  kbShow: EmitterSubscription;
  kbHide: EmitterSubscription;

  constructor(props: Props) {
    super(props);
    this.animHeight = new Animated.Value(this.viewHeight);
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
    Animated.timing(this.animHeight, {
      duration: event.duration,
      toValue: this.viewHeight + event.endCoordinates.height
    }).start(() => {
      this.scrollView.scrollTo({
        x: 0,
        y: event.endCoordinates.height
      });
    });
  };

  keyboardHide = (event: KeyboardEvent) => {
    Animated.timing(this.animHeight, {
      duration: event.duration,
      toValue: this.viewHeight
    }).start();
  };

  handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    this.viewHeight = height;
  };

  render() {
    const { style, children } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const animatedStyles = [{ height: this.animHeight }];

    return (
      <ScreenView
        style={containerStyles}
        scrollable={true}
        comRef={ref => (this.scrollView = ref)}
      >
        <Animated.View style={animatedStyles}>
          <View onLayout={this.handleLayout}>{children}</View>
        </Animated.View>
      </ScreenView>
    );
  }
}
