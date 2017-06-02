import react, {createElement as e} from 'react';
import {Fill} from '../lib/ui/Plugin';
import {readdirSync, existsSync} from 'fs';
import {resolve, dirname} from 'path';
import {findPlugins, isPluginEnabled} from './selectors';
import {connect} from './connect';

const appRequire = (path) => {
  return require(resolve(__dirname, '..', path));
};

const loadSystemPlugins = () => {
  const pluginDir = resolve(dirname(global.module.filename), '../plugins');
  return loadPlugins(pluginDir);
};

const loadUserPlugins = () => {
  const pluginDir = resolve(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], '.youtrack/plugins');
  return loadPlugins(pluginDir);
};

const loadPlugins = (pluginDir) => {
  if (!existsSync(pluginDir)) return [];
  const plugins = readdirSync(pluginDir).map(loadPlugin);

  const pluginLoadErrors = plugins.filter(isError);

  pluginLoadErrors.forEach(printError);

  return plugins;

  function loadPlugin(pluginName) {
    const preq = require;
    const path = resolve(pluginDir, pluginName);

    try {
      return createPlugin(
        pluginName,
        path,
        preq(path));
    } catch (error) {
      return createLoadPluginError(error);
    }
  }

  function createPlugin(pName, pPath, pModule) {
    return {
      name: pName,
      path: pPath,
      module: {
        reducer: pModule.reducer,
        render: pModule.renderer ? pModule.renderer(react, Fill, appRequire) : null
      }
    };
  }

  function createLoadPluginError(error) {
    error.message = 'AppPlugin(LoadPlugin):' + error.message;
    return error;
  }

  function isError(it) {
    return it instanceof Error;
  }

  function printError(error) {
    global.console.error(error);
  }
};

export const pluginList = [].concat(loadSystemPlugins()).concat(loadUserPlugins());

const flatten = (result, it) => {
  return result.concat(it);
};

export const Plugins = connect((state) => ({
  plugins: findPlugins(state)
}))((props) => {
  const plugins = props.plugins;
  const PluginItems = pluginList
    .filter((plugin) => {
      return isPluginEnabled(plugin.name, plugins);
    })
    .map((plugin) => plugin.module.render)
    .filter((render) => render)
    .reduce(flatten, []);

  const Items = PluginItems.map((Item) => {
    return e(Item);
  });

  return e('Plugins', null, ...Items);
});
