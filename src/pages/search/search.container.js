// @flow
import Search from './search';
import { reduxConnect } from '../../utils';
import { search } from '../../store/bus';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  search: text => dispatch(search(text))
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Search);
