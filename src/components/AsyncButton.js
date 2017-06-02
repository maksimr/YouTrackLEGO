import {createElement as e} from 'react';
import {$Promised} from '../../lib/ui/Promised';
import Button from '../../lib/ui/Button';
import {Small as InlineLoader} from '../../lib/ui/Loader';

export const AsyncButton = $Promised({
  'onClick': [() => e(InlineLoader)]
})(Button);
