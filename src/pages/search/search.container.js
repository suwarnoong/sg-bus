// @flow
import Search from './search';
import { reduxConnect } from '../../utils';
import { search } from '../../store/bus';

const mapStateToProps = state => ({
  geolocation: state.service.geolocation
});

const mapDispatchToProps = dispatch => ({
  search: (text, position) => dispatch(search(text, position))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Search);
