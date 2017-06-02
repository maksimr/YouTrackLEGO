import {resolve as urlResolve} from 'url';
import {
  formatFields,
  sendRequest,
  extendMessage,
  createMessage as _createMessage
} from '../lib/net/request';
import {findActiveServer, findCurrentToken} from './selectors';

export const fetchConfig = (baseUrl, params = {}) => {
  const url = urlResolve(baseUrl, 'api/config?fields=' + formatFields(params.fields || []));

  return fetch(url, params).then(function(resp) {
    return resp.json();
  });
};

export const fetchCurrentUser = (baseUrl, params = {}) => {
  const url = urlResolve(baseUrl, 'rest/users/me?fields=' + formatFields(params.fields || []));

  return fetch(url, params).then(function(resp) {
    return resp.json();
  });
};

export const sendSignedRequest = (message, cb) => {
  const {store} = require('./store');
  const state = store.getState();

  const token = findCurrentToken(state);
  const signedMessage = extendMessage(message, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  return sendRequest(signedMessage, cb);
};

export const createMessage = (options) => {
  const {store} = require('./store');
  const state = store.getState();
  const server = findActiveServer(state);

  return _createMessage(Object.assign({
    url: server.url
  }, options));
};
