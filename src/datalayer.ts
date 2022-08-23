/**
 * By Alexey Avramenko and Retentioneering Team
 * Copyright (C) 2020 Maxim Godzi, Anatoly Zaytsev, Retentioneering Team
 * This Source Code Form is subject to the terms of the Retentioneering Software Non-Exclusive, Non-Commercial Use License (License)
 * By using, sharing or editing this code you agree with the License terms and conditions.
 * You can obtain License text at https://github.com/retentioneering/retentioneering-dom-observer/blob/master/LICENSE.md
 */
import { Observable } from './observable'
import { CustomEvent } from './types'
import { EventEmitter, createEventEmitter } from './event-emitter'

type CreateObservableParams = {
  emitInitial?: boolean
}

export interface ReteDatalayer {
  getEvents: () => CustomEvent[],
  push: (event: CustomEvent) => void,
  createStream: (params?: CreateObservableParams) => Observable<CustomEvent>,
  emitter: EventEmitter<CustomEvent>,
  clear: () => void,
}

declare global {
  interface Window {
    reteDatalayer?: ReteDatalayer
  }
}

const createDataLayer = (): ReteDatalayer => {
  const events: CustomEvent[] = []
  const emitter = createEventEmitter<CustomEvent>()

  const push = (event: CustomEvent) => {
    events.push(event)
    emitter.emit(event)
  }

  const clear = () => {
    events.splice(0, events.length)
  }

  const createStream = ({ emitInitial }: CreateObservableParams = {}) => {
    return new Observable<CustomEvent>((observer) => {
      if (emitInitial) {
        for (const event of events) {
          observer.next(event)
        }
      }

      const onEvent = (event: CustomEvent) => {
        observer.next(event)
      }

      emitter.addEventListener(onEvent)
      return () => {
        emitter.removeEventListener(onEvent)
      }
    })
  }

  return {
    getEvents: () => events,
    push,
    createStream,
    emitter,
    clear,
  }
}

export const getDatalayer = () => {
  window.reteDatalayer = window.reteDatalayer || createDataLayer()
  return window.reteDatalayer
}
