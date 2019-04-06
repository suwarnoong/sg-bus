import pick from 'lodash/pick';
import assign from 'lodash/assign';
import flatMap from 'lodash/flatMap';
import identity from 'lodash/identity';

const pickStyles = (styles, styleNames) => {
  if (Array.isArray(styles)) {
    return pick(Object.assign({}, ...styles), styleNames);
  } else {
    return pick(styles, styleNames);
  }
};

export default pickStyles;
