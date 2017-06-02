import {createElement as e, Component} from 'react';
import PropTypes from 'prop-types';

export class Layout extends Component {
  render() {
    const props = this.props;

    return e('div', {
      style: getLayoutStyle(props)
    }, props.children);
  }

  getChildContext() {
    return {
      $layout: this.props.type
    };
  }
}

Layout.childContextTypes = {
  $layout: PropTypes.string
};


export class Flex extends Component {
  render() {
    const props = this.props;

    return e('div', {
      style: getFlexStyle(props, this.context.$layout)
    }, props.children);
  }
}

Flex.contextTypes = {
  $layout: PropTypes.string
};


function getLayoutStyle(props) {
  const type = props.type || 'row';

  return Object.assign({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: type
  }, props.fill ? {
    margin: 0,
    width: '100%',
    minHeight: '100%',
    height: '100%'
  } : null, layoutAlign(props.align), props.style);

  function layoutAlign(value = ['start', 'stretch']) {
    const mA = mainAxis(value[0]);
    const cA = crossAxis(value[1]);

    return {
      justifyContent: mA,
      alignItems: cA,
      alignContent: cA
    };

    function mainAxis(value) {
      switch (value) {
        case 'start':
          return 'flex-start';
        case 'end':
          return 'flex-end';
        case 'center':
          return 'center';
        case 'space-around':
          return 'space-around';
        case 'space-between':
          return 'space-between';
      }
    }

    function crossAxis(value) {
      switch (value) {
        case 'start':
          return 'flex-start';
        case 'end':
          return 'flex-end';
        case 'center':
          return 'center';
        case 'stretch':
          return 'stretch';
      }
    }
  }
}

function getFlexStyle(props, layout) {
  const value = props.size || 'auto';
  let flex = null;

  if (value === 'auto') flex = {flex: '1 1 auto'};
  if (value === 'none') flex = {flex: '0 0 auto'};
  if (value === 'initial') flex = {flex: '0 1 auto'};
  if (value === 'grow') flex = {flex: '1 1 100%'};

  if (!flex && typeof value === 'string') {
    flex = {
      flex: '1 1 ' + value,
      maxWidth: layout === 'row' ? value : '100%',
      maxHeight: layout === 'row' ? '100%' : value
    };
  }

  return Object.assign({
    boxSizing: 'border-box'
  }, flex, props.style);
}
