import {createElement as e} from 'react';
import {connect} from '../connect';
import {Box} from '../../lib/ui/Box';
import {Text} from '../../lib/ui/Text';
import Center from '../../lib/ui/Center';
import Line from '../../lib/ui/Line';
import {Slot} from '../../lib/ui/Plugin';
import CenterView from '../../lib/ui/CenterView';
import {MenuSwitcher} from '../components/MenuSwitcher';

const Codor = () => {
  return e('img', {
    width: 200,
    src: 'img/codor.png'
  });
};

export const Blank = () => {
  return e(Box, null,
    e(CenterView, null,
      e(Codor),
      e(Box, null,
        e(Center, null,
          e(Line, null,
            e(Text, null, 'Hello!')
          ),
          e(Line, {style: {paddingTop: 10}},
            e(Text, null, 'Ready to hack YouTrack?')
          ),
          e(Line, {style: {paddingTop: 10}},
            e(Text, null, 'Click on ', e(MenuSwitcher), ' in the toolbar')
          )
        )
      )
    ),
    e(Slot, {name: 'BlankView.Content'}));
};

export default connect()(Blank);
