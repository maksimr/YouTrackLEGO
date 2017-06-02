import {createElement as e, Component} from 'react';
import {connect} from '../connect';
import CenterView from '../../lib/ui/CenterView';
import {SmallText, Text} from '../../lib/ui/Text';
import Input from '../../lib/ui/Input';
import Center, {center} from '../../lib/ui/Center';
import Line from '../../lib/ui/Line';
import {Box} from '../../lib/ui/Box';
import {i18n} from '../../lib/i18n/i18n';
import Logo from '../components/Logo';
import ServerAdd from './ServerAdd';
import {loginUser} from './../actions';
import {fetchCurrentUser} from './../api';
import {findActiveServer} from './../selectors';
import {AsyncButton} from '../components/AsyncButton';
import {Link} from '../../lib/ui/Link';

const CenterInput = center(Input);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {tokenId: ''};
  }

  render() {
    const props = this.props;
    const server = props.server;

    return e(CenterView, {style: {width: '50%', height: '50%'}},
      e(Center, null,
        e(Box, null,
          e(Logo, {width: 130})
        )
      ),

      e(Center, null, server ?
        this.renderLoginForm(server) :
        e(ServerAdd))
    );
  }

  hubUrl(config, path) {
    if (config.hubUrl) {
      return config.hubUrl + '/' + path;
    }

    return config.url + '/admin/hub/' + path;
  }

  renderLoginForm(server) {
    const pem_token = this.state.tokenId;

    return e(Box, null,
      e(Line, null,
        e(CenterInput, {
          placeholder: 'Permanent token',
          onChange: (evt) => {
            const value = evt.target.value;
            this.setState(() => ({tokenId: value}));
          },
          multiLine: true,
          key: 'user_pem',
          id: 'user_pem'
        })
      ),
      e(Box, null,
        e(SmallText, null,
          e(Line, null, server.url),
          e(Line, null, server.version, '-', server.build),
          e(Box, null,
            e(Line, null,
              e(Link, {
                style: {marginRight: 10},
                external: true,
                href: 'https://www.jetbrains.com/help/hub/2017.2/Manage-Permanent-Tokens.html?search=authentication%20token'
              }, 'Documentation'),
              '  ',
              e(Link, {
                external: true,
                href: this.hubUrl(server, 'users/me?tab=authentification')
              }, 'Create Token')
            )
          )
        )
      ),
      e(Box, null,
        (pem_token &&
          e(AsyncButton, {onClick: this.onLogin.bind(this)},
            e(Text, null, i18n('Login'))
          )
        )
      )
    );
  }

  onLogin() {
    const tokenId = this.state.tokenId;
    const server = this.props.server;

    return fetchCurrentUser(server.hubUrl, {
      fields: ['id', 'name', 'login', {avatar: ['url']}],
      headers: {
        Authorization: 'Bearer ' + tokenId
      }
    }).then((user) => {
      if (user.guest || user.banned) {
        return;
      }

      return this.props.onLogin({
        tokenId: tokenId,
        serverId: server.id,
        userId: user.id,
        userName: user.name,
        userLogin: user.login,
        userAvatarUrl: user.avatar.url
      });
    });
  }
}

export default connect((state) => {
  return {
    server: findActiveServer(state)
  };
}, {
  onLogin: loginUser
})(Login);
