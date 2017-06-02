import {createElement as e, Component} from 'react';
import TextField from 'material-ui/TextField';

export class Input extends Component {
  value() {
    return this.input.value;
  }

  render() {
    const style = this.props.style;

    return e(TextField, Object.assign({
      inputStyle: style,
      textareaStyle: style,
      ref: (c) => {
        if (c) this.input = c.input;
      },
    }, this.props), this.props.children);
  }
}

export default Input;
