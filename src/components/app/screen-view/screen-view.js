import React, { PureComponent } from 'react';
import { BackHandler } from 'react-native';
import { ScrollView, View } from '../../base';
import styles from './screen-view.styles';

type Props = {
  scrollable: boolean,
  comRef: Function
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
    const { backgroundColor, comRef, children, scrollable, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);
    if (backgroundColor) containerStyles.push({ backgroundColor });

    return (
      <Container ref={comRef} style={containerStyles}>
        {children}
      </Container>
    );
  }
}
