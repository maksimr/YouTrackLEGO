import shallowEqual from 'fbjs/lib/shallowEqual';
import PropTypes from 'prop-types';
import {Component} from 'react';

export const $Pure = (shouldComponentUpdate) => {
  return (Comp) => {
    class PureComponentWrap extends Component {
      shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.isThemeChanged(nextContext)) {
          return true;
        }

        if (shouldComponentUpdate) {
          return shouldComponentUpdate(
            [this.props, nextProps],
            [this.state, nextState]
          );
        }

        return (
          !shallowEqual(this.props, nextProps) ||
          !shallowEqual(this.state, nextState)
        );
      }

      isThemeChanged(nextContext) {
        return !(this.context.muiTheme.name === nextContext.muiTheme.name);
      }

      render() {
        return Comp(this.props, this.context);
      }
    }

    PureComponentWrap.contextTypes = {
      muiTheme: PropTypes.object
    };

    return PureComponentWrap;
  };
};