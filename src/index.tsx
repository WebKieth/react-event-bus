import { createContext, useContext, ReactNode } from 'react'

type TEventsMap = Array<(...args: any) => void>
type TEventName = string

export class _EventBus {
  bus: Map<TEventName, TEventsMap>
  constructor() {
    this.bus = new Map()
  }

  $un(id: TEventName, callback: (...args: any) => void) {
    if (!this.bus.has(id)) return
    const listeners = this.bus.get(id)
    if (listeners === undefined) return
    this.bus.set(
      id,
      listeners.filter((listener) => listener !== callback),
    )
  }

  $on(id: TEventName, callback: (...args: any) => void) {
    const callbacks = this.bus.get(id)
    if (callbacks === undefined) {
      this.bus.set(id, [callback])
    } else {
      this.bus.set(id, [callback, ...callbacks])
    }
  }

  $emit(id: TEventName, ...params: any[]) {
    const callbacks = this.bus.get(id)
    if (callbacks === undefined) return
    callbacks.forEach((cb) => cb(...params))
  }
}
const bus = new _EventBus()
const EventBusContext = createContext(bus)

type Props = {
  children: ReactNode
}
const EventBusProvider = ({ children }: Props) => {
  return <EventBusContext.Provider value={bus}>{children}</EventBusContext.Provider>
}

const useEventBusProvided = () => useContext(EventBusContext)

export {
  EventBusProvider,
  useEventBusProvided,
}