const isUpperCase = value => {
  const charCode = value.charCodeAt(0);
  return charCode >= 65 && charCode <= 90;
};

const toCamelCase = o => {
  var newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function(value) {
      if (typeof value === 'object') {
        value = toCamelCase(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        let isConsecutive = true;
        newKey = origKey.split('').reduce((acc, val) => {
          if (isUpperCase(val) && isConsecutive) {
            return acc + val.toLowerCase();
          } else {
            isConsecutive = false;
            return acc + val;
          }
        }, '');
        // newKey = (
        //   origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
        // ).toString();
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamelCase(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
};

export default toCamelCase;
