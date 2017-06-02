import {createElement as e} from 'react';

export const Form = (props) => {
  let newProps = props;

  if (props.onSubmit) {
    newProps = Object.assign({}, props, {
      onSubmit: function(evt) {
        evt.preventDefault();
        return props.onSubmit.apply(this, arguments);
      }
    });
  }

  return e('form', newProps, newProps.children);
};
