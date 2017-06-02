import {createElement as e} from 'react';
import {connect} from './../connect';
import {Box} from '../../lib/ui/Box';
import {SmallText, Text} from '../../lib/ui/Text';
import Line from '../../lib/ui/Line';
import {Layout, Flex} from '../../lib/ui/Layout';
import Checkbox from '../../lib/ui/Checkbox';
import {isMenuOpen, findPlugins, isPluginEnabled} from '../selectors';
import {pluginList} from '../AppPlugins';
import {enablePlugin, disablePlugin} from '../actions';
import Themable from '../../lib/ui/Themeable';

export default Themable()(connect((state) => ({
  isOpen: isMenuOpen(state),
  plugins: findPlugins(state)
}))((props) => {
  if (!props.isOpen) return null;

  const dispatch = props.dispatch;
  const plugins = props.plugins;

  return e(Flex, {size: '300px'}, renderMenu(props));

  function renderMenu(props) {
    const theme = props.muiTheme;
    const items = pluginList.map(renderPluginItem);

    return e(Box, {
      style: {
        backgroundColor: theme.palette.menuColor,
        borderRight: '1px solid',
        borderRightColor: theme.palette.borderColor,
        height: '100%',
        overflow: 'auto'
      }
    }, ...items);
  }

  function renderPluginItem(plugin) {
    const id = plugin.name;
    const enabled = isPluginEnabled(id, plugins);

    return e(Box, null,
      e(Layout, {type: 'row'},
        e(Flex, {size: '95%'},
          e(Line, null,
            e(Text, null, plugin.name)),
          e(Line, null,
            e(SmallText, null, plugin.path))
        ),
        e(Flex, {size: '5%'},
          e(Checkbox, {
            checked: enabled,
            onClick: () => {
              dispatch(enabled ?
                disablePlugin(id) :
                enablePlugin(id)
              );
            }
          })
        )
      )
    );
  }
}));
