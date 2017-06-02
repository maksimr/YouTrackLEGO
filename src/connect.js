import {connect as rConnect} from 'react-redux';

export const connect = function(a, b, c, d) {
  return rConnect(a, b, c, Object.assign({

    // TODO(maksimrv): find better solution which allow has pure component
    // but re-render them if we change themeId
    // Whe should listen state change because when we change
    // themeId all controls should be re-rendered
    pure: false
  }, d));
};
