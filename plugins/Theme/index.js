const copy = (it) => Object.assign({}, it);

module.exports = {
  reducer: (state, action) => {
    state = state || {};

    switch (action.type) {
      case 'CHANGE_THEME':
        state = copy(state);
        state.theme = {name: action.payload.name};
        return state;
      default:
        return state;
    }
  },

  renderer: function(react, Fill, $require) {
    const e = react.createElement;
    const ThemeProvider = $require('lib/ui/ThemeProvider').default;
    const darkTheme = $require('lib/ui/DarkTheme').default;
    const lightTheme = $require('lib/ui/LightTheme').default;
    const Button = $require('lib/ui/Button').default;
    const Icon = $require('lib/ui/Icon').Icon;
    const connect = $require('src/connect').connect;

    const isLight = (theme) => {
      if (!theme) return true;
      return theme.name === lightTheme.name;
    };

    return [
      connect((state) => ({
        theme: state.plugin.Theme.theme
      }))((props) => {
        return e(Fill, {name: 'App.Provider'},
          e(ThemeProvider, {theme: isLight(props.theme) ? lightTheme : darkTheme}, null));
      }),
      connect((state) => ({
        theme: state.plugin.Theme.theme
      }))((props) => {
        const theme = props.theme || lightTheme;

        return e(Fill, {name: 'App.Action'},
          e(Button, {
            flat: true,
            size: 'auto',
            onClick: () => {
              props.dispatch({
                type: 'CHANGE_THEME',
                payload: isLight(theme) ? darkTheme : lightTheme
              });
            }
          }, e(Icon, {icon: isLight(theme) ? 'moon' : 'sun'})));
      })
    ];
  }
};