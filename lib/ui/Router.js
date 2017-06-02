import {createElement as e} from 'react';

export const route = (path, component, opts = {}) => {
  return {
    path,
    component,
    useAsDefault: opts.useAsDefault
  };
};

export const Route = (props) => {
  return e('Route', props, props.children);
};

export default ({currentPath = '/', routeConfig = {}}) => {
  let matchedRoute = routeConfig.find(isMatched) || routeConfig.find(isDefault);

  return matchedRoute ? e(matchedRoute.component) : null;

  function isMatched(route) {
    return route.path === currentPath;
  }

  function isDefault(route) {
    return route.useAsDefault;
  }
};
