const {ISSUE_FIELDS} = require('./constant');

module.exports = ($require) => {
  const r = $require('lib/net/request');
  const {
    sendSignedRequest,
    createMessage
  } = $require('src/api');

  const fetchIssues = (params, cb) => {
    const message = createMessage({
      path: '/api/issues',
      query: {
        query: params.query,
        fields: r.formatFields(ISSUE_FIELDS),
        $top: 20
      }
    });

    const req = sendSignedRequest(
      message,
      r.jsonHandler((error, issues) => {
        cb(error, issues);
      })
    );

    req.on('error', (error) => cb(error));
    req.end();
  };

  return {
    fetchIssues: fetchIssues
  };
};