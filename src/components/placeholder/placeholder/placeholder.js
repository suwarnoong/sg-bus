// @flow
import * as React from 'react';
import { Label, Loader, FadeView, View } from '../../base';
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
    isReady: false,
    margin: 0
  };

  hasChildren = false;
  loader = require('../../../assets/loader.json');

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

    const loaderWrapperStyles = [styles.loaderWrapper];
    if (margin) loaderWrapperStyles.push({ margin });

    const contentWrapperStyles = [styles.contentWrapper];

    return (
      <View style={containerStyles}>
        <View style={loaderWrapperStyles}>
          {this.hasChildren ? children : <Loader source={this.loader} />}
        </View>
        <FadeView start={isReady} style={contentWrapperStyles}>
          {this.renderContent()}
        </FadeView>
      </View>
    );
  }
}
