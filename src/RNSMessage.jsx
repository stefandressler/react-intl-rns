import { createElement, isValidElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { config } from './index';

/**
 * Definitions of shortcuts for getting translated formatted messages.
 */
export const rnsShorts = namespace => {
  return {
    rnsM: rnsMessageShort(RNSMessage)(namespace),
    rnsMS: rnsMessageStringShort('formatMessage')(namespace),
    // rnsFM: intlMessageShort(FormattedMessage)(namespace), // use the default FormattedMessage from react-intl
  };
};

/**
 * mainly copy/paste from react-intl FormattedMessage render method.
 */
export default class RNSMessage extends FormattedMessage {
  static displayName = 'RNSMessage';

  render() {
    const {
      formatMessage,
      messages
    } = this.context.intl;

    const {
      id,
      description,
      defaultMessage,
      values,
      tagName = null,
      children
    } = this.props;

    let tokenDelimiter;
    let tokenizedValues;
    let elements;

    let hasValues = values && Object.keys(values).length > 0;
    if (hasValues) {
      // Creates a token with a random UID that should not be guessable or
      // conflict with other parts of the `message` string.
      let uid = Math.floor(Math.random() * 0x10000000000).toString(16);

      let generateToken = (() => {
        let counter = 0;
        return () => `ELEMENT-${uid}-${counter += 1}`;
      })();

      // Splitting with a delimiter to support IE8. When using a regex
      // with a capture group IE8 does not include the capture group in
      // the resulting array.
      tokenDelimiter = `@__${uid}__@`;
      tokenizedValues = {};
      elements = {};

      // Iterates over the `props` to keep track of any React Element
      // values so they can be represented by the `token` as a placeholder
      // when the `message` is formatted. This allows the formatted
      // message to then be broken-up into parts with references to the
      // React Elements inserted back in.
      Object.keys(values).forEach(name => {
        let value = values[name];

        if (isValidElement(value)) {
          let token = generateToken();
          tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
          elements[token] = value;
        } else {
          tokenizedValues[name] = value;
        }
      });
    }

    // check deepest namespace path of given id in intl.messages
    let rnsId = deepestIntlNSReduceLeft(messages, id) || id;
    let rnsDefaultMessage = `${config.defaultMessagePrefix}${rnsId}` || defaultMessage;

    let descriptor = { id: rnsId, description, defaultMessage: rnsDefaultMessage };
    let formattedMessage = formatMessage(descriptor, tokenizedValues || values);

    let nodes;

    let hasElements = elements && Object.keys(elements).length > 0;
    if (hasElements) {
      // Split the message into parts so the React Element values captured
      // above can be inserted back into the rendered message. This
      // approach allows messages to render with React Elements while
      // keeping React's virtual diffing working properly.
      nodes = formattedMessage
        .split(tokenDelimiter)
        .filter(part => !!part)
        .map(part => elements[part] || part);
    } else {
      nodes = [formattedMessage];
    }

    if (typeof children === 'function') {
      return children(...nodes);
    }

    return createElement(tagName, null, ...nodes);
  }
}

/**
 * Returns react element (span tag) with translated key.
 */
const rnsMessageShort = component => {
  return namespace => {
    let prefix = prefixer(namespace);
    return (id, values, ...args) => {
      return createElement(component, {
        defaultMessage: `${config.defaultMessagePrefix}${prefix(id)}`,
        id: prefix(id),
        values
      });
    };
  };
};

/**
 * Returns string with translated key.
 */
const rnsMessageStringShort = method => {
  return namespace => {
    let prefix = prefixer(namespace);
    return (id, values, ...args) => {
      let checkIntlNS = messages => {
        return { defaultMessage: `${config.defaultMessagePrefix}${prefix(id)}`, id: deepestIntlNSReduceLeft(messages, prefix(id)) };
      };
      return intl => new StringPromise(
        intl,
        validIntl => validIntl[method](checkIntlNS(intl.messages), values)
      ).toString();
    };
  };
};

/**
 * Check for key as longest possible namespace-string.
 */
/*
const deepestIntlNSReduceRight = (messages = {}, path = '') => {
  let split = path.split('.');
  let key = split.pop();
  let ns = split;
  let deepestNS = [];
  let idx;
  let deepestNSKey;

  for (messages, idx = 0; idx <= ns.length; idx += 1) {
    deepestNS = ns.slice(0, ns.length - idx);
    deepestNS.push(key);
    deepestNSKey = deepestNS.join('.');

    if (messages[deepestNSKey]) {
      return deepestNSKey;
    }
  }
};
*/

const deepestIntlNSReduceLeft = (messages = {}, path = '') => {
  let ns = path.split('.');
  let deepestNS = [];
  let idx;

  for (messages, idx = 0; idx <= ns.length; idx += 1) {
    deepestNS = ns.slice(idx).join('.');

    if (messages[deepestNS]) {
      return deepestNS;
    }
  }
};

/**
 * Delays execution of func(intl) until a cast to a string is made.
 */
class StringPromise {
  constructor(intl, func) {
    this.intl = intl;
    this.func = func;
  }

  toString() {
    return this.func(this.intl);
  }
}

/**
 * Returns a function that prefixes ids with namespace.
 */
const prefixer = namespace => {
  if (namespace) {
    return key => `${namespace}${config.separator}${key}`; // Prefix ids and keys with the given namespace.
  } else {
    return key => key; // No namespace, match the signatures of the namespaced constructs.
  }
};
