import tape from 'tape';

import {
  messagesFull,
  messagesFirstFallback
} from './helper-intl-messages';

import { withIntl } from './helper-intl';
import {
  config,
  rnsShorts
} from '../';

tape('----- rnsShorts -----', t => {
  t.ok(true); // just for writing the headline to console

  const { rnsM } = rnsShorts('reverse.name.space');

  // ====================

  t.test('rnsM`INTL_MESSAGE_KEY` full namespaced key', t => {
    const messages = messagesFull;
    const expected = messages['reverse.name.space.title'];

    const { shallowIntl } = withIntl({ locale: 'sv-SE', messages });
    const component = shallowIntl(rnsM`title`);

    t.equal(component.length, 1, 'should have rendered something');

    t.equal(component.type(), 'span', 'it should have rendered a span');
    t.equal(component.text(), expected, `it should have a text of "${expected}"`);

    t.end();
  });

  // ====================

  t.test('rnsM`INTL_MESSAGE_KEY` fallback namespaced key', t => {
    const messages = messagesFirstFallback;
    const expected = messages['name.space.title'];

    const { shallowIntl } = withIntl({ locale: 'sv-SE', messages });
    const component = shallowIntl(rnsM`title`);

    t.equal(component.length, 1, 'should have rendered something');

    t.equal(component.type(), 'span', 'it should have rendered a span');
    t.equal(component.text(), expected, `it should have a text of "${expected}"`);

    t.end();
  });

  // ====================

  t.test('rnsM`INTL_MESSAGE_KEY` key not found', t => {
    const messages = messagesFull;
    const expected = `${config.defaultMessagePrefix}reverse.name.space.notexists`;

    const { shallowIntl } = withIntl({ locale: 'sv-SE', messages });
    const component = shallowIntl(rnsM`notexists`);

    t.equal(component.length, 1, 'should have rendered something');

    t.equal(component.type(), 'span', 'it should have rendered a span');
    t.equal(component.text(), expected, `it should have a text of "${expected}"`);

    t.end();
  });

  t.end();
});
