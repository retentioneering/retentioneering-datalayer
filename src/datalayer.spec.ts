/**
 * By Alexey Avramenko and Retentioneering Team
 * Copyright (C) 2020 Maxim Godzi, Anatoly Zaytsev, Retentioneering Team
 * This Source Code Form is subject to the terms of the Retentioneering Software Non-Exclusive, Non-Commercial Use License (License)
 * By using, sharing or editing this code you agree with the License terms and conditions.
 * You can obtain License text at https://github.com/retentioneering/retentioneering-dom-observer/blob/master/LICENSE.md
 */
import { getReteDataLayer } from './datalayer'
import { CustomEvent } from './types'

beforeEach(() => {
  getReteDataLayer().clear()
})

const mockEvent = (): CustomEvent => ({
  type: 'custom-event',
  name: 'my-custom-event',
  data: {
    event_value: 'test',
  },
})

test('write & read', () => {
  const reteDatalayer = getReteDataLayer()
  const event = mockEvent()
  reteDatalayer.add(event)

  const events = reteDatalayer.getEvents()
  const unhandledEvents = reteDatalayer.getUnhandledEvents()

  expect(events).toEqual([event])
  expect(unhandledEvents).toEqual([event])
})


test('handle event', () => {
  const reteDatalayer = getReteDataLayer()
  const event = mockEvent()
  const dispatchCustomEvent = jest.fn()

  reteDatalayer.registerGlobalHandler(dispatchCustomEvent)
  reteDatalayer.add(event)

  const events = reteDatalayer.getEvents()
  const unhandledEvents = reteDatalayer.getUnhandledEvents()

  expect(events).toEqual([event])
  expect(unhandledEvents).toEqual([])
  expect(dispatchCustomEvent).toBeCalledWith(event)
  reteDatalayer.clearGlobalHandler()
})

test('clear', () => {
  const reteDatalayer = getReteDataLayer()
  const event = mockEvent()

  reteDatalayer.add(event)
  expect(reteDatalayer.getEvents()).toHaveLength(1)
  expect(reteDatalayer.getUnhandledEvents()).toHaveLength(1)
  reteDatalayer.clear()
  expect(reteDatalayer.getEvents()).toHaveLength(0)
  expect(reteDatalayer.getUnhandledEvents()).toHaveLength(0)
})

test('clear unhandled events', () => {
  const reteDatalayer = getReteDataLayer()
  const event = mockEvent()

  reteDatalayer.add(event)
  expect(reteDatalayer.getEvents()).toHaveLength(1)
  expect(reteDatalayer.getUnhandledEvents()).toHaveLength(1)
  reteDatalayer.clearUnhandledEvents()
  expect(reteDatalayer.getUnhandledEvents()).toHaveLength(0)
  expect(reteDatalayer.getEvents()).toHaveLength(1)
})

test('separate scripts', () => {
  const event = mockEvent()
  const reteDatalayer1 = getReteDataLayer()
  const reteDatalayer2 = getReteDataLayer()

  reteDatalayer1.add(event)

  expect(reteDatalayer2.getEvents()).toEqual([event])
  expect(reteDatalayer2.getEvents()).toEqual(reteDatalayer1.getEvents())

  reteDatalayer1.clear()

  expect(reteDatalayer1.getEvents()).toEqual([])
  expect(reteDatalayer2.getEvents()).toEqual([])
})
