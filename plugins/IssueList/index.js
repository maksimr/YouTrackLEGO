const copy = (it) => Object.assign({}, it);

module.exports = {
  reducer: (state, action) => {
    state = state || {};

    switch (action.type) {
      case 'CHANGE_ISSUES_QUERY':
        state = copy(state);
        state.query = action.payload.query;
        state.issue = null;
        return state;
      case 'ISSUE_LIST_OPEN_ISSUE':
        state = copy(state);
        state.issue = action.payload.issue;
        return state;
      case 'ISSUE_LIST_CLOSE_ISSUE':
        state = copy(state);
        state.issue = null;
        return state;
      default:
        return state;
    }
  },
  renderer: function(react, Fill, $require) {
    const e = react.createElement;
    const {route, Route} = $require('lib/ui/Router');
    const {connect} = $require('src/connect');

    const {IssueListView} = require('./IssueListView')($require, react);
    const IssueListAction = require('./IssueListAction')($require, react);

    return [
      connect()((props) => {
        return e(Fill, {name: 'App.Action'}, e(IssueListAction, props));
      }),
      () => {
        return e(Fill, {name: 'App.Route'},
          e(Route, {route: route('/issues', IssueListView)})
        );
      }
    ];
  }
};
