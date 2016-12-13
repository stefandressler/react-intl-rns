import tape from 'tape';

import {
  messagesRTLFull,
  messagesRTLFirstFallback
} from './helper-intl-messages';

import { withIntl } from './helper-intl';
import { rnsShorts } from '../';

tape('----- rnsShorts with reduce from right to left -----', t => {
  t.ok(true); // just for writing the headline to console

  const { rnsM } = rnsShorts('reverse.name.space', 'REDUCE_RTL');

  // ====================

  t.test('rnsM`INTL_MESSAGE_KEY` REDUCE_RTL full namespaced key', t => {
    const messages = messagesRTLFull;
    const expected = messages['reverse.name.space.title'];

    const { shallowIntl } = withIntl({ locale: 'sv-SE', messages });
    const component = shallowIntl(rnsM`title`);

    t.equal(component.length, 1, 'should have rendered something');

    t.equal(component.type(), 'span', 'it should have rendered a span');
    t.equal(component.text(), expected, `it should have a text of "${expected}"`);

    t.end();
  });

  // ====================

  t.test('rnsM`INTL_MESSAGE_KEY` REDUCE_RTL fallback namespaced key', t => {
    const messages = messagesRTLFirstFallback;
    const expected = messages['reverse.name.title'];

    const { shallowIntl } = withIntl({ locale: 'sv-SE', messages });
    const component = shallowIntl(rnsM`title`);

    t.equal(component.length, 1, 'should have rendered something');

    t.equal(component.type(), 'span', 'it should have rendered a span');
    t.equal(component.text(), expected, `it should have a text of "${expected}"`);

    t.end();
  });

  t.end();
});
