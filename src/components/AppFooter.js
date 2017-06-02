import {createElement as e} from 'react';
import Center from '../../lib/ui/Center';
import {Text} from '../../lib/ui/Text';
import {Box} from '../../lib/ui/Box';
import {version} from '../../package.json';
import Themable from '../../lib/ui/Themeable';

const versions = global.process.versions;

export default Themable()(function(props) {
  const theme = props.muiTheme;
  const styles = getStyles(theme);

  return e(Box, {style: styles.root},
    e(Center, null,
      e(Text, {style: styles.version}, 'node:', versions.node),
      e(Text, {style: styles.version}, 'Chromium:', versions.chrome),
      e(Text, {style: styles.version}, 'Electron:', versions.electron),
      e(Text, {style: styles.version}, 'Lisa:', version)
    )
  );
});

function getStyles(theme) {
  return {
    root: {
      fontSize: 'small',
      backgroundColor: theme.palette.footerColor,
      margin: '0'
    },

    version: {
      margin: '0 8px'
    }
  };
}
