import {createElement as e} from 'react';
import {Icon} from '../../lib/ui/Icon';
import Button from '../../lib/ui/Button';
import {toggleMenu} from '../actions';
import {connect} from '../connect';

export const MenuSwitcher = connect(null, {
  onClick: toggleMenu.bind(null, null)
})((props) => {
  return e(Button, {
    flat: true,
    size: 'auto',
    onClick: props.onClick
  }, renderMenuIcon());

  function renderMenuIcon() {
    return e(Icon, {icon: 'menu'});
  }
});
