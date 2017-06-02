import {createElement as e} from 'react';
import Avatar from '../../lib/ui/Avatar';

export const UserAvatar = (props) => {
  const user = props.user;
  if (!user) return null;

  const newProps = Object.assign({title: (user.name || user.login), src: user.avatarUrl}, props);
  delete newProps.user;

  return e(Avatar, newProps);
};

export const UserAvatarSmall = (props) => {
  return e(UserAvatar,
    Object.assign({}, props, {
      style: Object.assign({
        width: 30, height: 30
      }, props.style)
    }), props.children);
};

export const UserAvatarLarge = (props) => {
  return e(UserAvatar,
    Object.assign({
      style: {width: 96, height: 96}
    }, props), props.children);
};
