import {createElement as e} from 'react';

export default function(props) {
  return e('img', {
    width: props.width || 200,
    src: 'img/logo.svg'
  });
}
