import React, { PureComponent } from 'react';
import i18next from 'i18next';
import { Trans } from 'react-i18next';
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

    if (isGeolocationEmpty(geolocation)) {
      return (
        <View>
          {IS_ANDROID ? (
            <View style={styles.infoDesc}>
              <TextItems
                Label={H3}
                texts={[
                  <H3>
                    {/* prettier-ignore */}
                    <Trans i18nKey="androidLocationServiceOffStep1">
                      Go to <B size={Label.SIZE_LARGE}>Settings </B> > <B size={Label.SIZE_LARGE}>Security & Location</B> > <B size={Label.SIZE_LARGE}>Location</B>
                    </Trans>
                  </H3>,
                  <H3>
                    {/* prettier-ignore */}
                    <Trans i18nKey="androidLocationServiceOffStep2">
                    Make sure that <B size={Label.SIZE_LARGE}>Use Location</B> is on
                    </Trans>
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
                    {/* prettier-ignore */}
                    <Trans i18nKey="iosLocationServiceOffStep1">
                    Go to <B size={Label.SIZE_LARGE}>Settings</B> > <B size={Label.SIZE_LARGE}>Privacy</B> > <B size={Label.SIZE_LARGE}>Location Service</B>
                    </Trans>
                  </H3>,
                  <H3>
                    {/* prettier-ignore */}
                    <Trans i18nKey="iosLocationServiceOffStep2">
                      Make sure that <B size={Label.SIZE_LARGE}>Location Services</B> is on
                    </Trans>
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
            <H3 style={styles.infoDesc}>{i18next.t('locationOutOfRange1')}</H3>
          </View>
          <View>
            <H3 style={styles.infoDesc}>{i18next.t('locationOutOfRange2')}</H3>
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
          <Title style={styles.title}>{i18next.t('nearestTitle')}</Title>
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
          <H1 style={styles.infoTitle}>{i18next.t('locationNotFoundTitle')}</H1>
          {this.renderEmptyLocationText()}
        </View>
      );
    }
  }
}
