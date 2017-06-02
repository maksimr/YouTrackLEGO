import {createElement as e} from 'react';

export const Box = (props) => {
  const styles = getStyles(props);
  const newProps = Object.assign({}, props, {style: Object.assign(styles.root, props.style)});

  delete newProps.inline;
  delete newProps.padding;
  delete newProps.paddingTop;
  delete newProps.paddingBottom;
  delete newProps.paddingLeft;
  delete newProps.paddingRight;

  return e('div', newProps, props.children);
};

function getStyles(props) {
  const padding = props.padding !== undefined ? props.padding : 1;

  return {
    root: {
      display: props.inline ? 'inline-block' : 'block',
      padding: p(
        padding,
        props.paddingTop,
        props.paddingRight,
        props.paddingBottom,
        props.paddingLeft
      )
    }
  };

  function p(padding,
             pT = padding,
             pR = padding,
             pB = padding,
             pL = padding) {
    return [pT, pR, pB, pL].map(scale).map(px).join(' ');
  }

  function scale(x) {
    return x * 10;
  }

  function px(x) {
    return x + 'px';
  }
}
