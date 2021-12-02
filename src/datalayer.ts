/**
 * By Alexey Avramenko and Retentioneering Team
 * Copyright (C) 2020 Maxim Godzi, Anatoly Zaytsev, Retentioneering Team
 * This Source Code Form is subject to the terms of the Retentioneering Software Non-Exclusive, Non-Commercial Use License (License)
 * By using, sharing or editing this code you agree with the License terms and conditions.
 * You can obtain License text at https://github.com/retentioneering/retentioneering-dom-observer/blob/master/LICENSE.md
 */
import { CustomEvent } from './types'

type DispatchCustomEventParams = Omit<CustomEvent, 'type'>

declare global {
  interface Window {
    reteUnhandledEvents?: CustomEvent[],
    reteDatalayerEvents?: CustomEvent[],
    reteTracker?: {
      dispatchCustomEvent?: (e: DispatchCustomEventParams) => void,
    }
  }
}


export const getReteDataLayer = () => {
  const getUnhandledEvents = () => {
    window.reteUnhandledEvents = window.reteUnhandledEvents || []
    return window.reteUnhandledEvents
  }

  const getDatalayerEvents = () => {
    window.reteDatalayerEvents = window.reteDatalayerEvents || []
    return window.reteDatalayerEvents
  }

  return {
    add: (event: CustomEvent) => {
      if (typeof window?.reteTracker?.dispatchCustomEvent === 'function') {
        if (event.type === 'custom-event') {
          window.reteTracker.dispatchCustomEvent(event)
        }
      } else {
        const unhandledEvents = getUnhandledEvents()
        unhandledEvents.push(event)
      }

      const datalayerEvents = getDatalayerEvents()
      datalayerEvents.push(event)
    },
    getEvents: () => getDatalayerEvents(),
    getUnhandledEvents: () => getUnhandledEvents(),
    clearUnhandledEvents: () => {
      window.reteUnhandledEvents = []
    },
    clear: () => {
      window.reteUnhandledEvents = []
      window.reteDatalayerEvents = []
    },
  }
}
