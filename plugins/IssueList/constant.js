export const ISSUE_USER_FIELDS = ([
  '$type',
  'id',
  'ringId',
  'login',
  'name',
  'fullName',
  'avatarUrl',
  'email'
]);

export const ISSUE_PROJECT_FIELDS = ([
  '$type',
  'id',
  'shortName',
  'ringId',
  'name'
]);

export const ISSUE_TAGS_FIELDS = ([
  'name',
  'id',
  'query',
  {
    color: ['id'],
    owner: ['id']
  }
]);

export const ISSUE_COLOR = {
  'color': ['id']
};

export const ISSUE_FIELD_VALUE = (
  {
    'value': [
      '$type',
      'id',
      'name',
      'localizedName',
      'ringId',
      'login',
      'avatarUrl',
      'fullName',
      'minutes',
      'presentation',
      'isResolved',

      ISSUE_COLOR
    ]
  }
);

export const ISSUE_FIELD_FIELDS = ([
  '$type',
  'id',
  'name',
  'hasStateMachine',

  ISSUE_FIELD_VALUE,

  {
    'projectCustomField': [
      '$type',
      'id',
      'ordinal',
      'canBeEmpty',
      'emptyFieldText',
      {
        'bundle': ['id']
      },

      {
        'field': [
          'id',
          'name',
          'ordinal',
          'localizedName',
          'isPublic',

          {
            'fieldType': ['valueType', 'isMultiValue']
          }
        ]
      }
    ]
  }
]);

export const ISSUE_FIELDS = [
  'id',
  'summary',
  'description',
  'numberInProject',

  'created',
  'updated',

  'resolved',

  'votes',

  {
    project: ISSUE_PROJECT_FIELDS,
    tags: ISSUE_TAGS_FIELDS,
    fields: ISSUE_FIELD_FIELDS
  },

  {
    reporter: ISSUE_USER_FIELDS,
    updater: ISSUE_USER_FIELDS
  }
];
