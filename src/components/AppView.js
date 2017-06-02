import {createElement as e} from 'react';
import {Layout, Flex} from '../../lib/ui/Layout';
import Themable from '../../lib/ui/Themeable';
import AppFooter from '../components/AppFooter';
import AppHeader from '../components/AppHeader';
import AppRouter from '../components/AppRouter';

export default Themable()((props) => {
  const theme = props.muiTheme;

  return e(Layout, {type: 'column', fill: true, style: {position: 'relative', fontFamily: theme.fontFamily}},
    e(Flex, {size: '40px'}, e(AppHeader)),
    e(Flex, {size: 'auto', style: {overflow: 'auto', position: 'relative'}}, e(AppRouter)),
    e(Flex, {size: '30px'}, e(AppFooter))
  );
});
