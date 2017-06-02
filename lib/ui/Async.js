import {createElement as e, Component} from 'react';

export const $Async = (asyncPropsMap, shouldInvalidate) => {
  return (Comp) => {
    return class extends Component {
      constructor(props) {
        super(props);
        this.state = {
          $error: null,
          $isLoading: null
        };
      }

      componentWillUnmount() {
        this._isDetached = true;
      }

      isDetached() {
        return this._isDetached;
      }

      componentWillMount() {
        this.runAsyncActions(this.props);
      }

      shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (
          shouldInvalidate &&
          shouldInvalidate([this.props, nextProps], [this.state, nextState], [this.context, nextContext])
        ) {
          this.runAsyncActions(nextProps);
        }
        return true;
      }

      runAsyncActions(props) {
        Object.keys(asyncPropsMap).map((propName) => {
          this.setState((state) => ({
            $isLoading: Object.assign({}, state.$isLoading, createObj([propName], [true]))
          }));

          asyncPropsMap[propName](props, (error, value) => {
            if (this.isDetached()) return;

            this.setState((state) => ({
              $isLoading: removeProp(state.$isLoading, propName)
            }));

            if (error) {
              this.setState((state) => ({
                $error: Object.assign({}, state.$error, createObj([propName], [error]))
              }));
              return;
            }

            this.setState((state) =>
              createObj(
                [propName, '$error'],
                [value, removeProp(state.$error, propName)]
              ));
          });
        });
      }

      render() {
        const props = this.props;

        return e(Comp,
          Object.assign({}, props, this.state),
          props.children);
      }
    };
  };
};

function removeProp(props, propName) {
  if (!props) return props;

  delete props[propName];

  if (!Object.keys(props).length) return null;
  return props;
}

function createObj(keys, values) {
  return keys.reduce((result, key, index) => {
    result[key] = values[index];
    return result;
  }, {});
}
