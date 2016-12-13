react-intl-rns
==============

React Intl namespaced keys with fallback from specific to general

## Overview

When using namespaced keys for translations it would be nice to have a fallback
when the exact key does not exists but a more generic one.

As seen in the following example it is possible to have specific keys for some
component besides a general version for the key.

Example:
```
const messages = {
  "name.space.cancel": "Stop this",
  "name.cancel": "Cancel this"
  "cancel": "Cancel"
}
```

The nice thing with __react-intl-rns__ is the build in fallback which means that
if you request a specific key but it is not present in the messages object the
nearest found parent is used instead.
Requesting the key _name.space.cancel_ will find _cancel_ and return it as a translation.

```
const messages = {
  "cancel": "Cancel"
}
```


## Usage

```
import { RNSMessage, rnsShorts } from 'react-intl-rns'
const { rnsM, rnsMS } = rnsShorts('very.long.name.space')
```

It exists two different find-versions when reducing the namespace: from left and from right
where _from left_ (REDUCE_LTR) is the default. If you want to find the key by reducing the namespace from
right (REDUCE_RTL) you have to use ```const { rnsM, rnsMS } = rnsShorts('very.long.name.space', 'REDUCE_RTL')```

```
<RNSMessage
  id="very.long.name.space.key"
  defaultMessage=""
  description=""
/>
```

```{ rnsM('key') }``` __or__ ```{ rnsM`key` }```

When using injectIntl and just translated string should be used
```
const { intl } = this.props
```
and then ```{ rnsMS('key')(intl) }``` __or__ ```{ rnsMS`key`(intl) }```

## Inspiration

Thanks for inspiration and code bits from [https://github.com/wrwrwr/react-intl-ns](https://github.com/wrwrwr/react-intl-ns)
