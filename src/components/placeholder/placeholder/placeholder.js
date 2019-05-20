// @flow
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { Label, View } from '../../base';
import styles from './placeholder.styles';

type Props = {
  isReady: boolean,
  whenReadyRender: Function,
  margin: number,
  style?: { [string]: mixed },
  children?: React.Node
};

export default class Placeholder extends React.PureComponent<Props> {
  static defaultProps = {
    margin: 0
  };

  hasChildren = false;

  componentWillMount() {
    this.hasChildren = this.props.children != null;
  }

  renderContent() {
    const { whenReadyRender } = this.props;
    if (typeof whenReadyRender === 'function') {
      return whenReadyRender();
    }
  }

  render() {
    const { isReady, margin, style, children } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    const wrapperStyles = [styles.wrapper];
    if (margin) wrapperStyles.push({ margin });

    return (
      <View style={containerStyles}>
        {isReady ? (
          this.renderContent()
        ) : (
          <View style={wrapperStyles}>
            {this.hasChildren ? (
              children
            ) : (
              <ActivityIndicator size="large" color="#1289A7" />
            )}
          </View>
        )}
      </View>
    );
  }
}
