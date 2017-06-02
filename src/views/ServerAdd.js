import {createElement as e, Component} from 'react';
import {SmallText, Text} from '../../lib/ui/Text';
import Input from '../../lib/ui/Input';
import {center} from '../../lib/ui/Center';
import Line from '../../lib/ui/Line';
import {Box} from '../../lib/ui/Box';
import {i18n} from '../../lib/i18n/i18n';
import {connect} from '../connect';
import {parse as urlParse, format as urlFormat} from 'url';
import {fetchConfig} from '../api';
import {addServer} from '../actions/index';
import {Error as ErrorMessage} from '../../lib/ui/Message';
import {AsyncButton} from '../components/AsyncButton';

const CenterInput = center(Input);

const DEFAULT_SERVER = 'youtrack.jetbrains.com';

export class ServerAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {url: '', errorText: null};
  }

  onChange(evt) {
    const url = normalizeUrl(evt.target.value);
    this.setState(() => ({url}));
  }

  onSubmit() {
    const url = this.state.url || normalizeUrl(DEFAULT_SERVER);

    return fetchConfig(url, {
      fields: ['version', 'build', {ring: ['serviceId', 'url']}]
    }).then((config) => {
      this.props.onAdd({
        id: config.ring.serviceId,
        url: url,
        hubUrl: config.ring.url,
        version: config.version,
        build: config.build
      });
    }, (error) => {
      this.setState(() => ({errorText: error.message}));
    });
  }

  render() {
    const url = this.state.url;
    const errorText = this.state.errorText;

    return e(Box, null,
      e(Line, null,
        e(CenterInput, {
          onChange: this.onChange.bind(this),
          errorText: errorText ? e(ErrorMessage, null, errorText) : null,
          placeholder: DEFAULT_SERVER,
          id: 'host'
        })
      ),

      e(Box, null,
        e(SmallText, null,
          (url ?
              e(Text, null, url) :
              e(Text, null, i18n('Join an existing server'))
          )
        )
      ),

      e(Box, null,
        (
          e(AsyncButton, {onClick: this.onSubmit.bind(this)},
            e(Text, null, i18n('Continue')))
        )
      )
    );
  }
}

export default connect(null, {
  onAdd: addServer
})(ServerAddForm);


function normalizeUrl(uri) {
  if (!uri) return uri;

  let a = urlParse(uri);

  a.protocol = a.protocol || 'https';

  if (!a.hostname && a.pathname) {
    a.hostname = a.path.replace(/^\/*/, '');
    a.pathname = '';
  }

  return urlFormat(a);
}
