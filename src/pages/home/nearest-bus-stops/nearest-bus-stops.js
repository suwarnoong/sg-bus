import React, { PureComponent } from 'react';
import {
  BusStopList,
  View,
  H1,
  H3,
  Label,
  Title,
  B,
  Loader,
  TextItems
} from '../../../components';
import { isGeolocationEmpty } from '../../../utils';
import { IS_ANDROID } from '../../../constants';
import styles from './nearest-bus-stops.styles';

type Props = {};

export default class NearestBusStops extends PureComponent<Props> {
  searching = require('../../../assets/follow-me.json');

  componentDidMount() {
    const { persisted, getNearestStops, geolocation } = this.props;
    if (persisted && !isGeolocationEmpty(geolocation)) {
      getNearestStops(geolocation);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { getNearestStops, geolocation, persisted } = this.props;

    const locationChanged =
      nextProps.geolocation.latitude != geolocation.latitude ||
      nextProps.geolocation.longitude != geolocation.longitude;
    const persistedChanged = nextProps.persisted && !persisted;

    if (persistedChanged || locationChanged) {
      if ('geolocation' in nextProps) {
        getNearestStops(nextProps.geolocation);
      } else {
        getNearestStops(geolocation);
      }
    }
  }

  renderEmptyLocationText = () => {
    const { geolocation } = this.props;

    if (!isGeolocationEmpty(geolocation)) {
      return (
        <View>
          {IS_ANDROID ? (
            <View style={styles.infoDesc}>
              <TextItems
                Label={H3}
                texts={[
                  <H3>
                    (Go to <B size={Label.SIZE_LARGE}>Settings</B>)
                  </H3>,
                  <H3>
                    Tap on <B size={Label.SIZE_LARGE}>Location Services</B> or{' '}
                    <B size={Label.SIZE_LARGE}>Location Access</B>
                  </H3>,
                  <H3>
                    Make sure that{' '}
                    <B size={Label.SIZE_LARGE}>Location Services</B> is on
                  </H3>
                ]}
              />
            </View>
          ) : (
            <View style={styles.infoDesc}>
              <TextItems
                Label={H3}
                texts={[
                  <H3>
                    Go to <B size={Label.SIZE_LARGE}>Settings</B> >{' '}
                    <B size={Label.SIZE_LARGE}>Privacy</B> >{' '}
                    <B size={Label.SIZE_LARGE}>Location Services</B>
                  </H3>,
                  <H3>
                    Make sure that{' '}
                    <B size={Label.SIZE_LARGE}>Location Services</B> is on
                  </H3>
                ]}
              />
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View>
          <View style={{ marginBottom: 10 }}>
            <H3 style={styles.infoDesc}>Are you outside of Singapore?</H3>
          </View>
          <View>
            <H3 style={styles.infoDesc}>
              We are sorry! The Bus Arrival app is only usable within Singapore.
            </H3>
          </View>
        </View>
      );
    }
  };

  render() {
    const { nearest, geolocation, style } = this.props;

    const containerStyles = [styles.container];
    if (style) containerStyles.push(style);

    if (nearest && nearest.length > 0) {
      return (
        <View style={containerStyles}>
          <Title style={styles.title}>Nearest Bus Stops</Title>
          <BusStopList
            list={nearest}
            onPress={item => {
              this.props.navigate('BusStopArrivals', {
                title: item.description,
                subTitle: `${item.roadName}    ${item.busStopCode}`,
                busStopCode: item.busStopCode
              });
            }}
            style={containerStyles}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.infoContainer}>
          <View style={styles.infoIconMask}>
            <Loader source={this.searching} style={styles.infoIcon} />
          </View>
          <H1 style={styles.infoTitle}>We are searching for your location</H1>
          {this.renderEmptyLocationText()}
        </View>
      );
    }
  }
}
