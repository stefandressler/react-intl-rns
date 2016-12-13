import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  IntlProvider,
  intlShape,
  addLocaleData
} from 'react-intl';
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';
const supportedLocales = [...en, ...sv];
addLocaleData(supportedLocales);

export const withIntl = node => {
  return {
    shallowIntl: initShallowIntl({ locale: 'en', messages: {} })(node),
    mountIntl: mountWithIntl({ locale: 'en', messages: {} })(node)
  };
};

const initShallowIntl = ({ locale, messages }) => {
  return ({ locale, messages }) => {
    return node => {
      const intlProvider = new IntlProvider({ locale, messages }, {});
      const { intl } = intlProvider.getChildContext();

      return shallow(node, { context: { intl } });
    };
  };
};

const mountWithIntl = ({ locale, messages }) => {
  return ({ locale, messages }) => {
    return node => {
      const intlProvider = new IntlProvider({ locale, messages }, {});
      const { intl } = intlProvider.getChildContext();

      return mount(nodeWithIntlProp(node, intl), {
        context: { intl },
        childContextTypes: { intl: intlShape }
      });
    };
  };
};

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node, intl) {
  return React.cloneElement(node, { intl });
}
