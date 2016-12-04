import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  IntlProvider,
  addLocaleData
} from 'react-intl';
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';
const supportedLocales = [...en, ...sv];
addLocaleData(supportedLocales);

// START - special for PhantomJS Intl Polyfill
import { areIntlLocalesSupported } from 'intl-locales-supported';
if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(supportedLocales)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    let IntlPolyfill = require('intl');
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}
// END - special for PhantomJS Intl Polyfill

import { rnsShorts } from '../';

describe('rnsShorts - REDUCE_FROM_LEFT', () => {
  it('rnsM - reverse.name.space.title wanted - exactly matched', () => {
    const { rnsM } = rnsShorts('reverse.name.space');
    const messages = {
      'reverse.name.space.title': 'rns.TITLE',
      'name.space.title': 'ns.TITLE',
      'space.title': 'n.TITLE',
      'title': 'TITLE'
    };
    renderToStaticMarkup(
      <IntlProvider locale='en' messages={messages}>
        { rnsM`title` }
      </IntlProvider>
    ).should.equal(`<span>${messages['reverse.name.space.title']}</span>`);
  });

  it('rnsM - reverse.name.space.title wanted - exactly matched - with explicit rnsReducerDirection', () => {
    const { rnsM } = rnsShorts('reverse.name.space', 'REDUCE_FROM_LEFT');
    const messages = {
      'reverse.name.space.title': 'rns.TITLE',
      'name.space.title': 'ns.TITLE',
      'space.title': 'n.TITLE',
      'title': 'TITLE'
    };
    renderToStaticMarkup(
      <IntlProvider locale='en' messages={messages}>
        { rnsM`title` }
      </IntlProvider>
    ).should.equal(`<span>${messages['reverse.name.space.title']}</span>`);
  });

  it('rnsM - reverse.name.space.title wanted but not exist - name.space.title matched', () => {
    const { rnsM } = rnsShorts('reverse.name.space');
    const messages = {
      'name.space.title': 'ns.TITLE',
      'space.title': 'n.TITLE',
      'title': 'TITLE'
    };
    renderToStaticMarkup(
      <IntlProvider locale='en' messages={messages}>
        { rnsM`title` }
      </IntlProvider>
    ).should.equal(`<span>${messages['name.space.title']}</span>`);
  });

  it('rnsM - reverse.name.space.title wanted but not exist - space.title matched', () => {
    const { rnsM } = rnsShorts('reverse.name.space');
    const messages = {
      'space.title': 'n.TITLE',
      'title': 'TITLE'
    };
    renderToStaticMarkup(
      <IntlProvider locale='en' messages={messages}>
        { rnsM`title` }
      </IntlProvider>
    ).should.equal(`<span>${messages['space.title']}</span>`);
  });

  it('rnsM - reverse.name.space.title wanted but not exist - title matched', () => {
    const { rnsM } = rnsShorts('reverse.name.space');
    const messages = {
      title: 'TITLE'
    };
    renderToStaticMarkup(
      <IntlProvider locale='en' messages={messages}>
        { rnsM`title` }
      </IntlProvider>
    ).should.equal(`<span>${messages.title}</span>`);
  });

  it('rnsM - reverse.name.space.title wanted but not exist - matched name.space.title - with almost correct exact one', () => {
    const { rnsM } = rnsShorts('reverse.name.space');
    const messages = {
      'reverse.name.space.title2': 'rns.TITLE',
      'name.space.title': 'ns.TITLE',
      'space.title': 'n.TITLE',
      'title': 'TITLE'
    };
    renderToStaticMarkup(
      <IntlProvider locale='en' messages={messages}>
        { rnsM`title` }
      </IntlProvider>
    ).should.equal(`<span>${messages['name.space.title']}</span>`);
  });
});
