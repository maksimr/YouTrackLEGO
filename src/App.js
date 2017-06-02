import {createElement as e, cloneElement} from 'react';
import ThemeProvider from '../lib/ui/ThemeProvider';
import Workspace from '../lib/ui/Workspace';
import {Layout} from '../lib/ui/Layout';
import {PluginProvider, Slot, Fill} from '../lib/ui/Plugin';
import AppMenu from './components/AppMenu';
import AppView from './components/AppView';
import {Plugins} from './AppPlugins';

export const App = () => {
  return e(PluginProvider, null,
    e('Init', null,
      e(Slot, {name: 'App.Provider'}, (providers) => {
        if (!providers.length) return null;

        return providers.reduce((children, provider) => {
          return cloneElement(provider, null, children);
        }, renderApp());
      }),
      e(Fill, {name: 'App.Provider'}, e(ThemeProvider, null, null)),
      e(Plugins)
    )
  );
};

function renderApp() {
  return e(Workspace, null,
    e(Layout, {type: 'row', fill: true},
      e(AppMenu),
      e(AppView)
    )
  );
}
