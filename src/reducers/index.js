import {combineReducers} from 'redux';
import {pluginList} from '../AppPlugins';
import {value as actionValue} from '../actions';
import {
  ADD_SERVER,
  ADD_TOKEN,
  LOGGED_IN,
  CHANGE_ROUTE,
  TOGGLE_MENU,
  LOGOUT,
  ENABLE_PLUGIN,
  DISABLE_PLUGIN
} from '../constants/ActionTypes';

const copy = (it) => Object.assign({}, it);

const serversById = (state = {}, action) => {
  const value = actionValue(action);

  switch (action.type) {
    case ADD_SERVER:
      state = copy(state);
      state[value.id] = value;
      return state;
    default:
      return state;
  }
};

const serverAllIds = (state = [], action) => {
  switch (action.type) {
    case ADD_SERVER:
      return state.concat(actionValue(action).id);
    default:
      return state;
  }
};

const tokensById = (state = {}, action) => {
  const value = actionValue(action);

  switch (action.type) {
    case ADD_TOKEN:
      state = copy(state);
      state[value.tokenId] = {server: value.serverId, userId: value.userId};
      return state;
    default:
      return state;
  }
};

const session = (state = {}, action) => {
  let value;

  switch (action.type) {
    case CHANGE_ROUTE:
      state = copy(state);
      state.route = actionValue(action);
      return state;
    case ADD_SERVER:
      state = copy(state);
      state.server = actionValue(action).id;
      return state;
    case LOGGED_IN:
      state = copy(state);
      state.token = actionValue(action).tokenId;
      return state;
    case TOGGLE_MENU:
      value = actionValue(action);
      state = copy(state);
      state.isMenuOpen = (value !== undefined && value !== null) ?
        value :
        !state.isMenuOpen;
      return state;
    case LOGOUT:
      state = copy(state);
      state.token = null;
      state.route = null;
      return state;
    default:
      return state;
  }
};

const usersById = (state = {}, action) => {
  const value = actionValue(action);

  switch (action.type) {
    case LOGGED_IN:
      state = copy(state);
      state[value.userId] = {
        name: value.userName,
        login: value.userLogin,
        avatarUrl: value.userAvatarUrl
      };
      return state;
    default:
      return state;
  }
};

const plugin = (state = {}, action) => {
  let value;
  let id;

  switch (action.type) {
    case DISABLE_PLUGIN:
    case ENABLE_PLUGIN:
      state = copy(state);
      value = actionValue(action);
      id = value.name;
      state[id] = Object.assign({}, state[id], {enabled: value.enabled});
      return state;
    default:
      return pluginList
        .filter((plugin) => {
          const id = plugin.name;
          return state[id] && state[id].enabled;
        })
        .filter((plguin) => {
          return plguin.module.reducer;
        }).reduce((state, plugin) => {
          const id = plugin.name;
          state = copy(state);
          state[id] = plugin.module.reducer(state[id], action);
          return state;
        }, state);
  }
};

export default combineReducers({
  plugin: plugin,
  session: session,
  entities: combineReducers({
    tokens: combineReducers({
      byId: tokensById
    }),
    users: combineReducers({
      byId: usersById
    }),
    servers: combineReducers({
      byId: serversById,
      allIds: serverAllIds
    })
  })
});
