import {createElement as e, Component} from 'react';
import Popover from 'material-ui/Popover';
import Themeable from './Themeable';

export const $Popup = function(params) {
  const template = params.template;
  const popupProps = params.props;

  return (Comp) => {
    return class extends Component {
      constructor(props) {
        super(props);
        this.state = {
          isPopupOpen: false,
          popupTemplateProps: null,
          anchorEl: null
        };

        this.$popup = {
          open: (el, props) => {
            this.setState(() => ({
              anchorEl: el,
              popupTemplateProps: props,
              isPopupOpen: true
            }));
          },
          close: () => {
            this.setState(() => ({
              isPopupOpen: false,
              anchorEl: null,
              popupTemplateProps: null
            }));
          },
          isOpen: () => this.state.isPopupOpen
        };
      }

      render() {
        const newProps = Object.assign({}, this.props, {$popup: this.$popup});

        return e('div', null,
          e(Comp, newProps, newProps.children),
          e(ThemeablePopup, Object.assign({
            open: this.state.isPopupOpen,
            anchorEl: this.state.anchorEl,
            onRequestClose: () => this.$popup.close()
          }, popupProps), !this.state.isPopupOpen ? null : e(template, Object.assign(
            {$popup: this.$popup}, this.state.popupTemplateProps)
          ))
        );
      }
    };
  };
};

export const Popup = function(props) {
  const style = getStyle(props.muiTheme);
  props = Object.assign({}, props, {
    style: Object.assign(style.popup, props.style)
  });

  return e(Popover,
    props,
    e('div', {style: style.popupContainer},
      props.children
    ),
    (
      props.anchorOrigin &&
      props.targetOrigin &&
      props.anchorOrigin.horizontal === 'middle' &&
      props.anchorOrigin.vertical === 'top' &&
      props.targetOrigin.horizontal === 'middle' &&
      props.targetOrigin.vertical === 'bottom' &&
      e('div', {style: style.triangleDown})
    )
  );
};

const ThemeablePopup = Themeable()(Popup);
export default ThemeablePopup;

function getStyle(theme = {palette: {}}) {
  const pallet = theme.palette;
  const bColor = pallet.borderColor || '#e2e2e2';

  return {
    popup: {
      boxShadow: 'none',
      backgroundColor: null
    },
    popupContainer: {
      margin: 5,
      border: '1px solid',
      backgroundColor: pallet.canvasColor,
      borderColor: bColor
    },
    triangleDown: {
      position: 'relative',
      width: 0,
      height: 0,
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderTop: '10px solid',
      borderTopColor: bColor,
      borderBottom: 'none',
      left: '50%',
      marginLeft: -8
    }
  };
}

