import {createElement as e} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export const Small = (props) => {
  return e(CircularProgress, {
    size: 30
  }, props.children);
};
