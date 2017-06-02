module.exports = ($require, react) => {
  const e = react.createElement;
  const {AsyncIssueList} = require('./IssueList')($require, react);
  const Box = $require('lib/ui/Box').Box;
  const Input = $require('lib/ui/Input').Input;
  const Form = $require('lib/ui/Form').Form;
  const Icon = $require('lib/ui/Icon').Icon;
  const connect = $require('src/connect').connect;

  return {
    IssueListView: connect((state) => ({
      query: state.plugin.IssueList.query
    }))((props) => {
      return e('div', null,
        renderSearch(),
        e(AsyncIssueList, props, props.children)
      );

      function renderSearch() {
        return e(Box, null,
          e(Form,
            {
              onSubmit: () => {
              }
            },
            renderSearchInput({
              query: props.query,
              onChange: (evt) => {
                props.dispatch({
                  type: 'CHANGE_ISSUES_QUERY',
                  payload: {
                    query: evt.target.value
                  }
                });
              }
            })
          )
        );
      }

      function renderSearchInput(props) {
        return e(Input, {
          hintText: e('span', null, e(Icon, {icon: 'magnifier'}), ' Search'),
          fullWidth: true,
          value: props.query || '',
          onChange: props.onChange,
          name: 'issuesQuery'
        });
      }
    })
  };
};
