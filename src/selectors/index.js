const getSession = (state) => state.session;
const getEntities = (state) => state.entities;
const getServers = (state) => getEntities(state).servers;
const getUsers = (state) => getEntities(state).users;
const getTokens = (state) => getEntities(state).tokens;

const findUserByTokenId = (tokenId, state) => {
  if (!tokenId) return null;

  const userId = getTokens(state).byId[tokenId].userId;
  return getUsers(state).byId[userId] || null;
};

export const isMenuOpen = (state) => {
  return state.session.isMenuOpen;
};

export const findPlugins = (state) => {
  return state.plugin;
};

export const isPluginEnabled = (pluginId, plugins) => {
  return (plugins[pluginId] && plugins[pluginId].enabled) || false;
};

export const findCurrentToken = (state) => {
  return getSession(state).token;
};

export const findCurrentUser = (state) => {
  return findUserByTokenId(getSession(state).token, state);
};

export const findActiveRoute = (state) => {
  return getSession(state).route;
};

export const findActiveServer = (state) => {
  return findServerById(getSession(state).server, state);
};

export const findServerById = (serverId, state) => {
  return getServers(state).byId[serverId] || null;
};
