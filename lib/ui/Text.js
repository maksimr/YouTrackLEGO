import {createElement as e} from 'react';
import Themeable from './Themeable';

export const $TextColor = (color) => {
  color = color || function() {
  };

  return (Comp) => {
    return Themeable()((props) => {
      return e(Comp, addColor(color(props), props), props.children);
    });
  };
};

export const SmallText = (props) => {
  return e('small', props, e(Text, null, props.children));
};

export const Text = $TextColor()((props) => {
  return e('span', props, props.children);
});

export const SecondaryText = $TextColor((props) =>
  props.muiTheme.palette.secondaryTextColor
)((props) => {
  return e('span', props, props.children);
});

function addColor(color, props) {
  props = Object.assign({}, props, {
    style: Object.assign({}, {
      color: color || props.muiTheme.palette.textColor
    }, props.style)
  });
  delete props.muiTheme;
  return props;
}
