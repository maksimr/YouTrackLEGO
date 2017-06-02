import {createElement as e} from 'react';

export const Error = (props) => {
  return props.children ? e('span', null, props.children) : null;
};