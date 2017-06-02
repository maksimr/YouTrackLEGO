import {createElement as e} from 'react';

export const Icon = (props) => {
  const newProps = Object.assign({}, props);
  delete newProps.icon;

  return e('span', Object.assign({
    className: 'lnr ' + 'lnr-' + props.icon
  }, newProps), props.children);
};
