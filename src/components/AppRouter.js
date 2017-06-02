import {createElement as e} from 'react';
import {connect} from '../connect';
import Router, {Route, route} from '../../lib/ui/Router';
import {Slot, Fill} from '../../lib/ui/Plugin';
import Login from '../views/Login';
import Blank from '../views/Blank';
import {findActiveRoute, findCurrentUser} from '../selectors/index';

export default connect((state) => {
  return {
    path: findActiveRoute(state),
    user: findCurrentUser(state)
  };
})((props) => {
  if (!props.user) return e(Login);

  return e('Router', null,
    e(Slot, {name: 'App.Route'}, (Routes) => {
      const routes = Routes.map((route) => {
        return route.props.route;
      });

      return e(Router, {
        currentPath: props.path,
        routeConfig: routes
      });
    }),

    e(Fill, {name: 'App.Route'},
      e(Route, {route: route('/blank', Blank, {useAsDefault: true})}))
  );
});
