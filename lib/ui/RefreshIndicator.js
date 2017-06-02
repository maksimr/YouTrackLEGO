import {createElement as e} from 'react';
import IRefreshIndicator from 'material-ui/RefreshIndicator';

export const RefreshIndicator = (props) => {
  const newProps = Object.assign({
    top: 0,
    left: 0,
    size: 30,
    status: 'loading',
    style: {
      display: 'inline-block',
      position: 'relative'
    }
  }, props);

  return e(IRefreshIndicator,
    newProps,
    props.children);
};
