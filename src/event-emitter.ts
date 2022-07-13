type EventListener<P = any> = (p: P) => any

export type EventEmitter<P = any> = {
    addEventListener: (listener: EventListener<P>) => void
    removeEventListener: (listener: EventListener<P>) => void
    removeAllListeners: () => void,
    emit: (payload: P) => void
}

export function createEventEmitter<P = any>(): EventEmitter<P> {
  const listeners: EventListener<P>[] = []
  return {
    addEventListener: (listener): void => {
      const existingListener = listeners.find((found) => found === listener)
      if (!existingListener) {
        listeners.push(listener)
      }
    },
    removeEventListener: (listener): void => {
      const existingListenerIndex = listeners.findIndex(
        (found) => found === listener
      )
      if (existingListenerIndex >= 0) {
        listeners.splice(existingListenerIndex, 1)
      }
    },
    emit: (payload): void => {
      listeners.forEach((listener) => listener(payload))
    },
    removeAllListeners: () => {
      listeners.splice(0, listeners.length)
    },
  }
}
