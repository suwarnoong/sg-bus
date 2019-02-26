import React, { PureComponent } from 'react';
import { View } from 'react-native';

export default ({ Icon, color = '#FFFFFF', backdropColor = 'transparent', size = 20 }) => {
  class IconCircleFactory extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        boxSize: 0,
      };
    }

    handleOnLayout({ nativeEvent }) {
      this.setState({ boxSize: nativeEvent.layout.width });
    }

    render() {
      const { boxSize } = this.state;
      const borderRadius = boxSize > 0 ? boxSize / 2 : 999;

      return (
        <View
          style={{
            backgroundColor: backdropColor,
            borderRadius: borderRadius,
            padding: 8,
          }}
          onLayout={this.handleOnLayout.bind(this)}
        >
          <Icon color={color} size={size} />
        </View>
      );
    }
  }

  return IconCircleFactory;
};
