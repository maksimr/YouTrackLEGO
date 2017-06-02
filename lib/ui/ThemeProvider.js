import {createElement as e} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LightTheme from './LightTheme';
import PropTypes from 'prop-types';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const ThemeProvider = (props, context) => {
  const theme = getMuiTheme(props.theme || LightTheme);

  if (context.muiTheme) {
    return e('Null', null, props.children);
  }

  return e(MuiThemeProvider, {
    muiTheme: theme
  }, props.children);
};

ThemeProvider.contextTypes = {
  muiTheme: PropTypes.object
};

export default ThemeProvider;
