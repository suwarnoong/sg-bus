import React, { PureComponent } from 'react';
import { Svg, G } from 'react-native-svg';
import { omit } from 'lodash';

type Props = {
  size: number,
  height: number,
  width: number,
  color: string
};

export default ({ viewBox = '0 0 512 512', defaultSize = 24, SvgContent }) => {
  class Icon extends PureComponent<Props> {
    render() {
      const { size = defaultSize, color, ...svgProps } = this.props;

      let { width, height } = this.props;

      if (!height) height = size;
      if (!width) width = size;

      return (
        <Svg
          {...omit(svgProps, 'color')}
          width={width}
          height={height}
          viewBox={viewBox}
        >
          <G fill={color} fill-rule="evenodd">
            {SvgContent}
          </G>
        </Svg>
      );
    }
  }

  return Icon;
};
