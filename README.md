# @retentioneering/datalayer

This package provides access to the retentioneering datalayer. With the package you can add events to the datalayer and read from it. If the rete-analytics-framework (aka tracker) is installed on the site, the added events will be sent to the analytics server according to its configuration.

## Install 

```
npm install @retentioneering/datalayer
```

## Usage

# send events

```ts
import { getReteDataLayer } from '@retentioneering/datalayer'

const reteDatalayer = getReteDataLayer()
reteDatalayer.add({
  type: 'custom-event',
  name: 'my-event-name',
  data: { // some stringified data
    some_property: 'some property',
  },
})
```

# read datalayer 

```ts
import { getReteDataLayer } from '@retentioneering/datalayer'

const reteDatalayer = getReteDataLayer()
const events = reteDatalayer.getEvents()
```