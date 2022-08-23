# @retentioneering/datalayer

This package provides access to the retentioneering datalayer. With the package you can push events to the datalayer, read from it and subscribe. 

# Install 

install package:
```
npm install @retentioneering/datalayer
```


# Usage

## Push events

```ts
import { getDatalayer } from '@retentioneering/datalayer'

const reteDatalayer = getDatalayer()

reteDatalayer.push({
  type: 'custom-event',
  name: 'my-event-name',
  data: { // some stringified data
    some_property: 'some property',
  },
})
```

## Get current events

```ts
import { getDatalayer } from '@retentioneering/datalayer'

const reteDatalayer = getDatalayer()
reteDatalayer.getEvents()
```

## Subscribe

### Obserbable-style

```ts
import { getDatalayer } from '@retentioneering/datalayer'

const reteDatalayer = getDatalayer()
const stream = reteDatalayer
    .createStream()

stream.subscribe((event) => {
  // do something
})
```
to unsubscribe, use:

```ts
const subs = stream.subscribe(handler)
subs.unsubscribe()
```

`createStream` function returns an `Observable` instance. This means that you can use `.filter`, `.reduce` and other methods to transform the stream:

```ts
const specificEventStream = 
  .filter((event) => event.name === 'some-event')

specificEventStream.subscribe((event) => {
  console.log(event.name) // "some-event" 
})
```

For more details see the [zen-observable](https://www.npmjs.com/package/zen-observable).

### EventEmitter style

```ts
import { getDatalayer } from '@retentioneering/datalayer'

const reteDatalayer = getDatalayer()
const { emitter } = reteDatalayer 

const onEvent = (event) => {
  // do something
}

// add listener
emitter.addEventListener(onEvent)

// remove listener
emitter.removeEventListener(onEvent)
```

## Clear datalayer

```ts
import { getDatalayer } from '@retentioneering/datalayer'

const reteDatalayer = getDatalayer()
reteDatalayer.clear()
```

This method only cleans up the state: removes all events from the datalayer. It has no effect on your streams, subscriptions and listeners. You should take care of it yourself.