import React from 'react';
import tape from 'tape';

import {
  messagesFull,
  messagesFirstFallback
} from './helper-intl-messages';

import { withIntl } from './helper-intl';
import { RNSMessage } from '../';

tape('----- <Component /> -----', t => {
  t.ok(true); // just for writing the headline to console

  t.test('<RNSMessage /> full namespaced key', t => {
    const ns = 'reverse.name.space.title';
    const messages = messagesFull;
    const expected = messages[ns];

    const rnsMessageProps = { id: ns };

    const { mountIntl } = withIntl({ locale: 'sv-SE', messages});
    const component = mountIntl(<RNSMessage {...rnsMessageProps} />);

    t.equal(component.find('span').type(), 'span', `it should have rendered a span`);
    t.equal(component.find('span').text(), expected, `it should have a text of "${expected}"`);

    t.end();
  });

  t.test('<RNSMessage /> fallback namespaced key', t => {
    const ns = 'name.space.title';
    const messages = messagesFirstFallback;
    const expected = messages[ns];

    const rnsMessageProps = { id: ns };

    const { mountIntl } = withIntl({ locale: 'sv-SE', messages});
    const component = mountIntl(<RNSMessage {...rnsMessageProps} />);

    t.equal(component.find('span').type(), 'span', `it should have rendered a span`);
    t.equal(component.find('span').text(), expected, `it should have a text of "${expected}"`);

    t.end();
  });

  t.end();
});
