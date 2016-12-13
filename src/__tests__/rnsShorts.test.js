import tape from 'tape';

import {
  messagesFull,
  messagesFirstFallback
} from './helper-intl-messages';

import { withIntl } from './helper-intl';
import { rnsShorts } from '../';

tape('----- rnsShorts -----', t => {
  t.ok(true); // just for writing the headline to console

  const { rnsM } = rnsShorts('reverse.name.space');

  // ====================

  t.test('rnsM`INTL_MESSAGE_KEY` full namespaced key', t => {
    const ns = 'reverse.name.space.title';
    const messages = messagesFull;
    const expected = messages[ns];

    const { shallowIntl } = withIntl({ locale: 'sv-SE', messages });
    const component = shallowIntl(rnsM`title`);

    t.equal(component.length, 1, 'should have rendered something');

    t.equal(component.type(), 'span', 'it should have rendered a span');
    t.equal(component.text(), expected, `it should have a text of "${expected}"`);

    t.end();
  });

  // ====================

  t.test('rnsM`INTL_MESSAGE_KEY` fallback namespaced key', t => {
    const ns = 'name.space.title';
    const messages = messagesFirstFallback;
    const expected = messages[ns];

    const { shallowIntl } = withIntl({ locale: 'sv-SE', messages });
    const component = shallowIntl(rnsM`title`);

    t.equal(component.length, 1, 'should have rendered something');

    t.equal(component.type(), 'span', 'it should have rendered a span');
    t.equal(component.text(), expected, `it should have a text of "${expected}"`);

    t.end();
  });

  t.end();
});
