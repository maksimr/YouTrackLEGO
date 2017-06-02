import {
  ADD_SERVER,
  LOGGED_IN,
  ADD_TOKEN,
  CHANGE_ROUTE,
  TOGGLE_MENU,
  LOGOUT,
  ENABLE_PLUGIN,
  DISABLE_PLUGIN
} from '../constants/ActionTypes';

const createAction = (actionType, payload) => {
  return {
    type: actionType,
    payload: payload
  };
};

export const value = (action) => action.payload;

export const toggleMenu = (isOpen) => {
  return function(dispatch) {
    dispatch(createAction(TOGGLE_MENU, isOpen));
  };
};

export const logout = () => {
  return function(dispatch) {
    dispatch(createAction(LOGOUT));
  };
};

export const addServer = (serverInfo) => {
  return function(dispatch) {
    dispatch(
      createAction(ADD_SERVER, serverInfo)
    );
  };
};

export const loginUser = (data) => {
  return function(dispatch) {
    dispatch(
      createAction(ADD_TOKEN, {
        tokenId: data.tokenId,
        serverId: data.serverId,
        userId: data.userId
      })
    );

    dispatch(
      createAction(LOGGED_IN, data)
    );

    dispatch(
      changeRoute('/issues')
    );
  };
};

const togglePlugin = (id, value) => {
  return (dispatch) => {
    dispatch(
      createAction(value ? ENABLE_PLUGIN : DISABLE_PLUGIN, {
        name: id,
        enabled: value
      })
    );
  };
};

export const enablePlugin = (id) => {
  return togglePlugin(id, true);
};

export const disablePlugin = (id) => {
  return togglePlugin(id, false);
};

export const changeRoute = (route) => {
  return function(dispatch) {
    dispatch(
      createAction(CHANGE_ROUTE, route)
    );
  };
};
