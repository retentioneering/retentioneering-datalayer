/**
 * By Alexey Avramenko and Retentioneering Team
 * Copyright (C) 2020 Maxim Godzi, Anatoly Zaytsev, Retentioneering Team
 * This Source Code Form is subject to the terms of the Retentioneering Software Non-Exclusive, Non-Commercial Use License (License)
 * By using, sharing or editing this code you agree with the License terms and conditions.
 * You can obtain License text at https://github.com/retentioneering/retentioneering-dom-observer/blob/master/LICENSE.md
 */
import waitForExpect from 'wait-for-expect'
import { getDatalayer } from './datalayer'
import { CustomEvent } from './types'

beforeEach(() => {
  getDatalayer().clear()
})

const mockEvent = (): CustomEvent => ({
  type: 'custom-event',
  name: 'my-custom-event',
  data: {
    event_value: 'test',
  },
})

test('write & read', () => {
  const reteDatalayer = getDatalayer()
  const event = mockEvent()
  reteDatalayer.push(event)

  const events = reteDatalayer.getEvents()

  expect(events).toEqual([event])
})


test('subscribe', async () => {
  const reteDatalayer = getDatalayer()
  const event = mockEvent()
  const handler = jest.fn()

  const subs = reteDatalayer.createStream().subscribe(handler)

  reteDatalayer.push(event)

  await waitForExpect(() => {
    expect(handler).toHaveBeenCalledWith(event)
    subs.unsubscribe()
  })
})


test('subscribe with initial', async () => {
  const reteDatalayer = getDatalayer()
  const event = mockEvent()
  const event2 = mockEvent()
  const handler = jest.fn()

  reteDatalayer.push(event)

  const subs = reteDatalayer
    .createStream({ emitInitial: true })
    .subscribe(handler)


  reteDatalayer
    .createStream({ emitInitial: true })
    .filter((event) => event.name === 'some-event')

  reteDatalayer.push(event2)

  await waitForExpect(() => {
    expect(handler).toHaveBeenCalledTimes(2)
    expect(handler.mock.calls).toEqual([[event], [event2]])
    subs.unsubscribe()
  })
})

test('two subs', async () => {
  const reteDatalayer = getDatalayer()
  const handler = jest.fn()

  const subs1 = reteDatalayer.createStream().subscribe(handler)
  const subs2 = reteDatalayer.createStream().subscribe(handler)

  reteDatalayer.push(mockEvent())
  reteDatalayer.push(mockEvent())

  await waitForExpect(() => {
    expect(handler).toHaveBeenCalledTimes(4)
    subs1.unsubscribe()
    subs2.unsubscribe()
  })
})

test('singleton', async () => {
  const reteDatalayer = getDatalayer()
  const reteDatalayer2 = getDatalayer()
  const handler = jest.fn()

  const subs1 = reteDatalayer.createStream().subscribe(handler)
  const subs2 = reteDatalayer2.createStream().subscribe(handler)

  reteDatalayer.push(mockEvent())
  reteDatalayer.push(mockEvent())

  await waitForExpect(() => {
    expect(handler).toHaveBeenCalledTimes(4)
    expect(reteDatalayer.getEvents()).toBe(reteDatalayer2.getEvents())
    subs1.unsubscribe()
    subs2.unsubscribe()
  })
})
