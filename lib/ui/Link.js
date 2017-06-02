import {createElement as e} from 'react';
import Themeable from './Themeable';
import {mergeStyle} from './Style';
import {shell} from 'electron';

export const Link = Themeable()((props) => {
  const newProps = mergeStyle({
    color: props.muiTheme.palette.linkColor,
    cursor: 'pointer'
  }, props);

  delete newProps.external;
  delete newProps.muiTheme;

  if (props.external && props.href) {
    newProps.onClick = function(evt) {
      evt.preventDefault();

      if (
        props.onClick &&
        props.onClick(evt) === false
      ) {
        return null;
      }

      return shell.openExternal(props.href);
    };
  }

  return e('a', newProps, props.children);
});
