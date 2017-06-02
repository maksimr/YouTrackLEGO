import {createElement as e, Component} from 'react';

export const $Promised = (promisePropsMap) => {
  return (Comp) => {
    return class extends Component {
      constructor(props) {
        super(props);
        this.state = createState(null);
      }

      componentWillUnmount() {
        this._isDetached = true;
      }

      isDetached() {
        return this._isDetached;
      }

      render() {
        const props = this.props;
        const state = this.state;
        const setState = (...args) => {
          if (!this.isDetached()) {
            return this.setState(...args);
          }
        };

        const propsDecorated = Object.keys(props)
          .reduce(decorateProps(props, promisePropsMap, setState), {});

        if (
          state.$isLoading &&
          promisePropsMap[state.$propName] &&
          promisePropsMap[state.$propName][0]
        ) {
          return e(promisePropsMap[state.$propName][0], props);
        }

        if (
          state.$hasError &&
          promisePropsMap[state.$propName] &&
          promisePropsMap[state.$propName][1]
        ) {
          return e(promisePropsMap[state.$propName][1],
            Object.assign({}, props, {$error: state.$error})
          );
        }

        return e(Comp, propsDecorated, props.children);
      }
    };
  };
};

function decorateProps(props, promisePropsMap, setState) {
  return (propsDecorated, propName) => {
    const propValue = props[propName];

    propsDecorated[propName] = promisePropsMap[propName] ?
      decorateProp(propName, propValue, setState) :
      propValue;

    return propsDecorated;
  };
}

function decorateProp(propName, propValue, setState) {
  return function(...args) {
    const result = propValue(...args);

    if (result.then) {
      setState(() => createState(propName, {$isLoading: true}));

      return result.then(() => {
        setState(() => createState(propName));
      }, (error) => {
        setState(() => createState(propName, {
          $hasError: true,
          $error: error
        }));
      });
    }

    return result;
  };
}

function createState(propName, params) {
  return Object.assign({
    $propName: propName,
    $isLoading: false,
    $hasError: false,
    $error: null
  }, params);
}
