import {createElement as e} from 'react';
import {Slot as _Slot, Fill as _Fill, Provider} from 'react-slot-fill';

const renderSlot = (items) => {
  return e('Slot', null, ...items);
};

export const Fill = _Fill;
export const Slot = (props) => {
  return e(_Slot, props, props.children || renderSlot);
};
export const PluginProvider = Provider;
