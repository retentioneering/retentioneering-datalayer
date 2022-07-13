/**
 * By Alexey Avramenko and Retentioneering Team
 * Copyright (C) 2020 Maxim Godzi, Anatoly Zaytsev, Retentioneering Team
 * This Source Code Form is subject to the terms of the Retentioneering Software Non-Exclusive, Non-Commercial Use License (License)
 * By using, sharing or editing this code you agree with the License terms and conditions.
 * You can obtain License text at https://github.com/retentioneering/retentioneering-dom-observer/blob/master/LICENSE.md
 */
import { createEventEmitter } from './event-emitter'

const expected = 'click'

test('add listener and emit', () => {
  const eventEmitter = createEventEmitter<string>()
  const handler = jest.fn()

  eventEmitter.addEventListener(handler)
  eventEmitter.emit(expected)

  expect(handler).toHaveBeenCalledTimes(1)
  expect(handler).toHaveBeenCalledWith(expected)
})

test('remove listener and emit', () => {
  const eventEmitter = createEventEmitter<string>()
  const handler = jest.fn()
  const handler2 = jest.fn()

  eventEmitter.addEventListener(handler)
  eventEmitter.addEventListener(handler2)

  eventEmitter.emit(expected)

  expect(handler).toHaveBeenCalledTimes(1)
  expect(handler2).toHaveBeenCalledTimes(1)

  eventEmitter.removeEventListener(handler2)

  eventEmitter.emit(expected)

  expect(handler).toHaveBeenCalledTimes(2)
  expect(handler2).toHaveBeenCalledTimes(1)
})

test('duplicate', () => {
  const eventEmitter = createEventEmitter<string>()
  const handler = jest.fn()

  eventEmitter.addEventListener(handler)
  eventEmitter.addEventListener(handler)
  eventEmitter.addEventListener(handler)

  eventEmitter.emit(expected)

  expect(handler).toHaveBeenCalledTimes(1)
})

test('remove all listeners', () => {
  const eventEmitter = createEventEmitter<string>()
  const handler = jest.fn()
  const handler2 = jest.fn()

  eventEmitter.addEventListener(handler)
  eventEmitter.addEventListener(handler2)

  eventEmitter.emit(expected)

  eventEmitter.removeAllListeners()

  eventEmitter.emit(expected)

  expect(handler).toHaveBeenCalledTimes(1)
  expect(handler2).toHaveBeenCalledTimes(1)
})
