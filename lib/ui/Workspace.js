import {createElement as e} from 'react';
import Themeable from './Themeable';

export default Themeable()(function(props) {
  const styles = getStyles(props);
  return e('div', {style: Object.assign(styles.root, props.style)},
    props.children);
});


function getStyles(props) {
  return {
    root: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: props.muiTheme.palette.canvasColor
    }
  };
}
