const getCurrentRoute = nav => {
  if (!!nav && !!nav.routes && nav.index !== undefined)
    return getCurrentRoute(nav.routes[nav.index]);
  return nav;
};

export default getCurrentRoute;
