export const createMessage = (options) => {
  const url = require('url');

  if (typeof options === 'string') {
    options = Object.assign(url.parse(options));
  }

  if (options.url) {
    options = Object.assign(url.parse(options.url), options);
  }

  return options;
};

export const extendMessage = (message, options) => {
  return createMessage(Object.assign({}, message, options));
};

export const sendRequest = (options, cb) => {
  const http = require('http');
  const https = require('https');
  const u = require('util');

  if (u.isObject(options.query)) {
    const qs = require('querystring');
    options = Object.assign({}, options, {
      query: qs.stringify(options.query)
    });
  }

  if (options.query) {
    options = Object.assign({}, options, {
      path: (options.path || '') + '?' + options.query
    });
  }

  return (
    (options.protocol === 'https:') ? https : http
  ).request(options, cb);
};

export const jsonHandler = (cb) => {
  return (resp) => {
    let data = '';
    resp.on('data', (d) => data += d);
    resp.on('end', () => {
      if (isOk(resp)) {
        return cb(null, JSON.parse(data));
      }

      cb(JSON.parse(data), null);
    });
  };

  function isOk(resp) {
    return (200 <= resp.statusCode) && (resp.statusCode < 300);
  }
};

export const formatFields = (it) => {
  const u = require('util');
  if (u.isUndefined(it)) return '';
  if (u.isString(it)) return it;

  if (u.isArray(it)) {
    return it.map((i) => formatFields(i)).join(',');
  }

  if (u.isObject(it)) {
    return formatFields(
      Object.keys(it).reduce((result, i) => {
        return result.concat(
          i + '(' + formatFields(it[i]) + ')'
        );
      }, [])
    );
  }
};
