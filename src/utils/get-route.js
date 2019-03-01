const getRoute = (nav, routeName) => {
  if (!!nav && !!nav.routes) {
    const found = nav.routes.filter(r => (r.routeName = routeName));
    if (found && found.length > 0) {
      return found[0];
    }
  }
  return nav;
};

export default getRoute;
