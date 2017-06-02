import {createElement as e} from 'react';
import {Box} from '../../lib/ui/Box';
import {Icon} from '../../lib/ui/Icon';
import Button from '../../lib/ui/Button';
import {Slot} from '../../lib/ui/Plugin';
import {AppDragRegion} from '../../lib/ui/AppDragRegion';
import Themable from '../../lib/ui/Themeable';
import {logout} from '../actions';
import {findCurrentUser} from '../selectors';
import {connect} from '../connect';
import {MenuSwitcher} from './MenuSwitcher';


const Logout = connect((state) => ({
  user: findCurrentUser(state)
}), {
  onClick: logout
})((props) => {
  if (!props.user) return null;

  return e(Button, {
    style: {float: 'right'},
    flat: true,
    size: 'auto',
    onClick: props.onClick
  }, e(Icon, {icon: 'exit'}));
});

export default Themable()(function(props) {
  const styles = getStyles(props.muiTheme);

  return e(AppDragRegion, null,
    e(Box, {style: styles.root},
      e(MenuSwitcher),
      renderActions(),
      e(Logout)
    )
  );

  function renderActions() {
    return e(Slot, {name: 'App.Action'}, (actions) => {
      actions = actions.map((action) => {
        return e(Box, {
          inline: true, padding: 0, paddingLeft: 1, paddingRight: 1
        }, action);
      });

      return e(Box, {inline: true, padding: 0, paddingLeft: 1, paddingRight: 1},
        ...actions);
    });
  }
});

function getStyles(theme) {
  return {
    root: {
      margin: '0',
      backgroundColor: theme.palette.headerColor
    }
  };
}

