import React, { PureComponent } from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {
  primaryColor,
  activeTextColor,
  lightTextColor,
  strokeColor,
} from '../../../colors';
import styles from './select-switch.styles';

type Props = {};

export default class SelectSwitch extends PureComponent<Props> {
  static defaultProps = {
    height: 35,
    textColor: lightTextColor,
    selectedColor: activeTextColor,
    backgroundColor: 'transparent',
    fontSize: 14,
    borderColor: primaryColor,
    borderRadius: 10,
    hasPadding: false,
    valuePadding: 1,
    bold: false,
    buttonColor: primaryColor,
    animationDuration: 150,
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    };

    this.animatedValue = new Animated.Value(
      this.props.initial ? this.props.initial / this.props.options.length : 0
    );
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.shouldSetResponder,
      onMoveShouldSetPanResponder: this.shouldSetResponder,
      onPanResponderRelease: this.responderEnd,
      onPanResponderTerminate: this.responderEnd,
    });

    this.toggleItem(this.props.initial);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.toggleItem(nextProps.value);
    }
  }

  shouldSetResponder = (evt, gestureState) => {
    return (
      evt.nativeEvent.touches.length === 1 &&
      !(Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5)
    );
  };

  responderEnd = (evt, gestureState) => {
    const swipeDirection = this.getSwipeDirection(gestureState);
    if (
      swipeDirection === 'RIGHT' &&
      this.state.selected < this.props.options.length - 1
    ) {
      this.toggleItem(this.state.selected + 1);
    } else if (swipeDirection === 'LEFT' && this.state.selected > 0) {
      this.toggleItem(this.state.selected - 1);
    }
  };

  getSwipeDirection = gestureState => {
    const { dx, dy, vx } = gestureState;
    // 0.1 velocity
    if (Math.abs(vx) > 0.1 && Math.abs(dy) < 80) {
      return dx > 0 ? 'RIGHT' : 'LEFT';
    }
    return null;
  };

  getBgColor = () => {
    const { selected } = this.state;
    const { options, buttonColor } = this.props;
    return options[selected].activeColor || buttonColor;
  };

  animate = (value, last) => {
    this.animatedValue.setValue(last);
    Animated.timing(this.animatedValue, {
      toValue: value,
      duration: this.props.animationDuration,
      easing: Easing.in,
      useNativeDriver: true,
    }).start();
  };

  toggleItem = index => {
    const { options, onPress } = this.props;
    if (options.length <= 1) return;

    this.animate(index / options.length, this.state.selected / options.length);

    if (onPress) {
      onPress(options[index]);
    } else {
      console.log('Call onPress with value: ', options[index]);
    }

    this.setState({ selected: index });
  };

  renderOptions = () => {
    const {
      options,
      fontSize,
      bold,
      textColor,
      selectedColor,
      textStyle,
      selectedTextStyle,
    } = this.props;

    return options.map((element, index) => (
      <View
        key={index}
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.toggleItem(index)}>
          {typeof element.customIcon === 'function'
            ? element.customIcon(this.state.selected == index)
            : element.customIcon}
          <Text
            style={[
              {
                fontSize,
                fontWeight: bold ? 'bold' : 'normal',
                textAlign: 'center',
                color: this.state.selected == index ? selectedColor : textColor,
                backgroundColor: 'transparent',
              },
              this.state.selected == index ? selectedTextStyle : textStyle,
            ]}>
            {element.label}
          </Text>
        </TouchableOpacity>
      </View>
    ));
  };

  render() {
    const {
      backgroundColor,
      borderColor,
      borderRadius,
      height,
      hasPadding,
      valuePadding,
      style,
    } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    return (
      <View style={containerStyles}>
        <View {...this.panResponder.panHandlers} style={{ flex: 1 }}>
          <View
            style={{
              borderRadius,
              backgroundColor,
              height,
            }}
            onLayout={event => {
              const { width } = event.nativeEvent.layout;
              this.setState({
                sliderWidth: width - (hasPadding ? valuePadding : 0),
              });
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                borderColor: borderColor || strokeColor,
                borderRadius,
                borderWidth: hasPadding ? 1 : 0,
              }}>
              {!!this.state.sliderWidth && (
                <Animated.View
                  style={[
                    {
                      height: hasPadding ? height - 4 : height,
                      backgroundColor: this.getBgColor(),
                      width:
                        this.state.sliderWidth / this.props.options.length -
                        (hasPadding ? valuePadding : 0),
                      transform: [
                        {
                          translateX: this.animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                              hasPadding ? valuePadding : 0,
                              this.state.sliderWidth -
                                (hasPadding ? valuePadding : 0),
                            ],
                          }),
                        },
                      ],
                      borderRadius,
                      marginTop: hasPadding ? valuePadding : 0,
                    },
                    styles.animated,
                  ]}
                />
              )}
              {this.renderOptions()}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
