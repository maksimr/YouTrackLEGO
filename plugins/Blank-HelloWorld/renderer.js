module.exports = (react, Fill, $require) => {
  const e = react.createElement;
  const Text = $require('lib/ui/Text').Text;
  const i18n = $require('lib/i18n/i18n').i18n;

  return () => {
    return e(Fill, {name: 'BlankView.Content'},
      e(Text, null, i18n('Hello World!')));
  };
};