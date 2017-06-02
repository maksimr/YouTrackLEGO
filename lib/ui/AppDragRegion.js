import {createElement as e} from 'react';
const o = Object.assign;

export const AppDragRegion = (props) => {
  return e('div', o({}, props, {
    style: o({'WebkitAppRegion': 'drag'}, props.style)
  }), props.children);
};
