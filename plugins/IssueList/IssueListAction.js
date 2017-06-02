module.exports = ($require, react) => {
  const e = react.createElement;
  const Button = $require('lib/ui/Button').default;
  const {Icon} = $require('lib/ui/Icon');

  return (props) => {
    return e(Button, {
      flat: true,
      size: 'auto',
      onClick: () => {
        props.dispatch({
          type: 'CHANGE_ROUTE',
          payload: '/issues'
        });
      }
    }, e(Icon, {icon: 'inbox'}));
  };
};
