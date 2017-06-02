export const mergeStyle = (style, props) => {
  props = props || {};

  return Object.assign({}, props, {
    style: Object.assign({}, props.style, style)
  });
};