module.exports = ($require, react) => {
  const e = react.createElement;
  const Box = $require('lib/ui/Box').Box;
  const Text = $require('lib/ui/Text').Text;
  const Center = $require('lib/ui/Center').default;
  const {Layout, Flex} = $require('lib/ui/Layout');
  const $Async = $require('lib/ui/Async').$Async;
  const $Pure = $require('lib/ui/Pure').$Pure;
  const RefreshIndicator = $require('lib/ui/RefreshIndicator').RefreshIndicator;
  const connect = $require('src/connect').connect;

  const {Issue, IssuePreview} = require('./Issue')($require, react);
  const api = require('./api')($require);

  const Issues = connect()($Pure()((props) => {
    const issues = props.issues || [];

    return e(Box, null, issues.map((issue) => {
      return e(Issue, {
        issue: issue,
        key: issue.id,
        onOpen: () => {
          props.dispatch({
            type: 'ISSUE_LIST_OPEN_ISSUE',
            payload: {
              issue: issue
            }
          });
        }
      });
    }));
  }));

  const IssueList = connect((state) => ({
    issue: state.plugin.IssueList.issue
  }))($Pure((props) => {
    return (
      props[0].issues !== props[1].issues ||
      props[0].issue !== props[1].issue
    );
  })((props) => {
    return e(Layout, {type: 'row', fill: true},
      e(Flex, {size: (props.issue ? '50%' : 'auto')}, e(Issues, {issues: props.issues})),
      (props.issues && props.issues.length && props.issue) && e(Flex, {
        size: '50%',
        style: {paddingLeft: 30}
      }, e(IssuePreview, {
        issue: props.issue,
        onClose: () => {
          props.dispatch({
            type: 'ISSUE_LIST_CLOSE_ISSUE',
            payload: {
              issueId: props.issue.id
            }
          });
        }
      }))
    );
  }));

  const IssuesLoadError = (props) => {
    return e(Box, null, e(Center, null, renderErrors(props.error)));

    function renderErrors(errors) {
      return Object.keys(errors).map((errorKey) => {
        const error = errors[errorKey];
        return e(Text, {key: error.error || errorKey},
          error.error_description || error.message || error);
      });
    }
  };

  const IssuesRefresh = $Pure()(() => {
    return e('div',
      {
        style: {
          position: 'absolute',
          left: '50%'
        }
      },
      e(RefreshIndicator));
  });

  const IssuesLoading = (props) => {
    return e('div', null,
      e(IssuesRefresh),
      e(IssueList, props));
  };

  const {debounce} = require('lodash');
  const fetchIssues = debounce(api.fetchIssues, 300, {
    leading: false,
    trailing: true
  });

  const EmptyIssuesList = (props) => {
    if (props.query) {
      return e(Box, null,
        e(Text, null,
          e(Center, null, 'We couldn’t find any issues matching "', e('b', null, props.query), '"')));
    }

    return null;
  };

  const AsyncIssueList = $Async({
    issues: (props, cb) => {
      fetchIssues({
        query: props.query
      }, cb);
    }
  }, (props) => {
    const currentProps = props[0];
    const nextProps = props[1];
    return currentProps.query !== nextProps.query;
  })((props) => {
    if (props.$isLoading) return e(IssuesLoading, {query: props.query, issues: props.issues});
    if (props.$error) return e(IssuesLoadError, {error: props.$error});

    if (!props.issues || !props.issues.length) {
      return e(EmptyIssuesList, {query: props.query});
    }

    return e(IssueList, {
      issues: props.issues
    });
  });

  return {
    IssueList: IssueList,
    AsyncIssueList: AsyncIssueList
  };
};
