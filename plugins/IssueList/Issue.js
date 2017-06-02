function isResolved(issue) {
  return issue.resolved;
}

module.exports = ($require, react) => {
  const e = react.createElement;
  const Line = $require('lib/ui/Line').default;
  const {Icon} = $require('lib/ui/Icon');
  const {Text, SecondaryText, SmallText} = $require('lib/ui/Text');
  const Box = $require('lib/ui/Box').Box;
  const $Pure = $require('lib/ui/Pure').$Pure;
  const {Link} = $require('lib/ui/Link');
  const {mergeStyle} = $require('lib/ui/Style');

  const colors = require('./colors');
  const _ = require('lodash');

  const IssueDescription = $Pure()((props) => {
    return e('small', null,
      e(Text, null,
        truncateDescription(props.issue.description)));

    function truncateDescription(description) {
      return _.truncate(description || '', {
        'length': 100,
        'omission': ' [...]'
      });
    }
  });

  const IssueSummary = $Pure()((props) => {
    const issue = props.issue;
    const resolved = isResolved(issue);

    if (resolved) {
      return e(Text, mergeStyle({opacity: 0.5, cursor: 'pointer'}, {onClick: props.onClick}),
        issueId(),
        issue.summary
      );
    }

    return e(Link, {
      onClick: props.onClick
    }, issueId(), issue.summary);

    function issueId() {
      return e(Box, {inline: true, padding: 0, paddingRight: 2}, e(IssueId, {issue: issue}));
    }
  });

  const IssueId = $Pure()((props) => {
    const issue = props.issue;
    return e('span', null, getReadableIssueId(issue));

    function getReadableIssueId(issue) {
      if (issue && issue.numberInProject && issue.project && issue.project.shortName) {
        return issue.project.shortName + '-' + issue.numberInProject;
      }
      return '';

    }
  });

  function renderFields(issue) {
    return issue.fields.slice(0, 5).map((field) => {
      return {
        id: field.id,
        name: fieldName(field),
        value: fieldValue(field),
        color: fieldColor(field)
      };
    }).map(function(field) {
      return e(SmallText, {key: field.id},
        e(SecondaryText, null, e(Field, field)));
    });

    function Field(data) {
      const color = colors.fieldColor(data.color);
      return e(Box,
        mergeStyle({
          color: color.color,
          backgroundColor: color.backgroundColor,
          marginRight: 5
        }, {inline: true, padding: 0}),
        data.name, ': ',
        data.value
      );
    }


    function fieldColor(field) {
      const NO_COLOR = -1;
      return (field.value && field.value.color) ? field.value.color.id : NO_COLOR;
    }
  }

  function fieldName(field) {
    return field.projectCustomField.field.name;
  }

  function fieldValue(field) {
    if (isEmpty(field)) {
      return emptyValue(field);
    }

    return field.value && field.value.name;

    function isEmpty(field) {
      if (isMultiple(field)) {
        return field.value && field.value.length === 0;
      }

      return field.value === null;
    }

    function emptyValue(field) {
      const projectField = field.projectCustomField;
      return projectField.canBeEmpty && projectField.emptyFieldText;
    }

    function isMultiple(field) {
      return field.projectCustomField.field.fieldType.isMultiValue;
    }
  }

  const Issue = $Pure()((props) => {
    const issue = props.issue;

    return e(Box,
      {
        padding: 0, paddingBottom: 3,
      },
      e(Line, padding(), e(IssueSummary, {
        issue: issue,
        onClick: props.onOpen
      })),
      e(Line, padding(), e(IssueDescription, {issue: issue})),
      e(Line, padding(),
        e(Text, null, renderFields(issue))
      ),

      isDetailed(() => e(Line, padding(),
        e(Text, null, 'Reporter: ', renderReporter(issue)),
        space(),
        e(Text, null, 'Updater: ', renderUpdater(issue))
      )),
      isDetailed(() => e(Line, padding(),
        e(Text, null, 'Created: ', issue.created),
        space(),
        e(Text, null, 'Updated: ', issue.updated)
      )),
      isDetailed(() => e(Line, null,
        e(Text, null, 'Votes: ', issue.votes),
        space(),
        e(Text, null, 'Resolved: ', issue.resolved ? 'v' : 'x')
      ))
    );

    function isDetailed(proc) {
      return props.isDetailedView ? proc() : null;
    }


    function space() {
      return e('span', null, ' ');
    }
  });

  const Votes = $Pure()((props) => {
    return e('span', {style: {color: '#2196F3'}},
      e(Icon, {icon: 'thumbs-up'}),
      ' ',
      props.issue.votes);
  });

  const BugMarker = $Pure()(() => {
    return e(Icon, {icon: 'bug', style: {color: '#FF5722'}});
  });

  const isBug = (issue) => {
    return issue.fields.some((field) => {
      return fieldValue(field) === 'Bug';
    });
  };

  const Marker = (props) => {
    return e(Box, {inline: true, padding: 0, paddingRight: 1}, props.children);
  };

  const IssuePreview = $Pure()((props) => {
    const issue = props.issue;

    return e(Text, null,
      e(Box, {padding: 0, paddingTop: 1, style: {position: 'relative'}},
        e('b', null,
          closeIssue(props),
          e(Box, {inline: true, padding: 0, paddingRight: 2},
            e(IssueId, {issue: issue})),
          issue.summary
        )
      ),

      e(Box, {padding: 0, paddingTop: 1},
        e(Text, null,
          e(Line, null,
            e(Marker, null, e(Votes, {issue: issue})),
            e(Marker, null, isBug(issue) && e(BugMarker))
          )
        )
      ),

      e(Box, {padding: 0, paddingTop: 1, paddingBottom: 1},
        e(Text, null, renderFields(issue))
      ),

      e(Box, {padding: 0, paddingTop: 1},
        issue.description)
    );

    function closeIssue(props) {
      return e(Icon, {
        icon: 'cross-circle',
        style: {
          cursor: 'pointer',
          position: 'absolute',
          left: -25,
        },
        onClick: props.onClose
      });
    }
  });

  return {
    Issue: Issue,
    IssuePreview: IssuePreview
  };

  function renderReporter(issue) {
    return userName(issue.renderReporter);
  }

  function renderUpdater(issue) {
    return userName(issue.updater);
  }

  function userName(user) {
    return user.fullName;
  }

  function padding() {
    return {style: {padding: '2px 0'}};
  }
};
