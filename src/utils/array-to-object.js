const reducer = (ids) => (result, item) => {
  const key = ids.reduce((acc, id) => `${(acc ? acc + '|' : '')}${item[id]}`, '');
  result[key] = item;
  return result;
}

export default (array, ...ids) => array.reduce(reducer(ids), {});