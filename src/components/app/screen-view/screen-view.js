import React, { PureComponent } from 'react';
import { BackHandler } from 'react-native';
import { ScrollView, View } from '../../base';
import { OfflineNotice } from '../offline-notice';
import styles from './screen-view.styles';

type Props = {
  scrollable: boolean,
  containerRef: Function,
};

export default class ScreenView extends PureComponent<Props> {
  Container: React.Element;

  constructor(props) {
    super(props);

    this.Container = props.scrollable ? ScrollView : View;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.back);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.back);
  }

  render() {
    const { Container } = this;
    const { backgroundColor, containerRef, children, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (backgroundColor) containerStyles.push({ backgroundColor });

    return (
      <Container {...this.props} ref={containerRef} style={containerStyles}>
        <OfflineNotice />
        {children}
      </Container>
    );
  }
}
