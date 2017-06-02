import {createElement as e} from 'react';
import {$TextColor} from './Text';

export const h1 = H('h1');
export const h2 = H('h2');
export const h3 = H('h3');

function H(headerLevel) {
  return $TextColor()((props) => {
    return e(headerLevel, props, props.children);
  });
}
