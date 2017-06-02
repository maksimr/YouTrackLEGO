import {createElement as e} from 'react';

export const center = (component) => {
  return (props) => {
    const styles = getStyles();

    return e(component,
      Object.assign({}, props, {
        style: Object.assign(styles.root, props.style)
      }),
      props.children);
  };
};

export default function(props) {
  const styles = getStyles();

  return e('div', {style: styles.root}, props.children);
}

function getStyles() {
  return {
    root: {
      textAlign: 'center'
    }
  };
}
