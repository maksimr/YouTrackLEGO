import {createElement as e} from 'react';
import Button from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MaIconButton from 'material-ui/IconButton';

export default function(props) {
  if (props.flat)
    return e(FlatButton, removeProps(['flat', 'iconStyle'], addStyle(props)), props.children);

  if (props.icon)
    return e(IconButton, addStyle(props), props.children);

  return e(Button, removeProps(['iconStyle'], addStyle(props)), props.children);
}

function IconButton(props) {
  return e(MaIconButton, Object.assign({}, props, {
    style: Object.assign({fontSize: 'inherit'}, props.style)
  }), props.icon);
}

function addStyle(props) {
  const buttonStyle = sizeStyle(props);
  return Object.assign({}, props, {
    style: Object.assign({}, buttonStyle.button, props.style),
    iconStyle: buttonStyle.icon
  });
}

function sizeStyle(props) {
  const style = {
    auto: {
      button: {
        width: 'auto',
        height: 'auto',
        lineHeight: null,
        minWidth: 'auto',
        padding: '0',
      },
      icon: {
        width: 'auto',
        height: 'auto'
      }
    },
    default: {
      button: null, icon: null
    }
  };

  return style[props.size] || style.default;
}

function removeProps(propList, props) {
  propList.forEach((propName) => {
    delete props[propName];
  });

  return props;
}
