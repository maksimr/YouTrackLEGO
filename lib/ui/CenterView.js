import {createElement as e} from 'react';

export default function(props) {
  const styles = getStyles();

  return e('div', {
    style: Object.assign(styles.root, props.style)
  }, props.children);
}

function getStyles() {
  return {
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  };
}
