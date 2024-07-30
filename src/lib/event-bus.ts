import { EventName, EventsMap } from "./types"

export class EventBus {
    bus: Map<EventName, EventsMap>
    constructor() {
      this.bus = new Map()
    }
  
    $un(id: EventName, callback: (...args: any[]) => void) {
      if (!this.bus.has(id)) return
      const listeners = this.bus.get(id)
      if (listeners === undefined) return
      this.bus.set(
        id,
        listeners.filter((listener) => listener !== callback),
      )
    }
  
    $on(id: EventName, callback: (...args: any[]) => void) {
      const callbacks = this.bus.get(id)
      if (callbacks === undefined) {
        this.bus.set(id, [callback])
      } else {
        this.bus.set(id, [callback, ...callbacks])
      }
    }
  
    $emit(id: EventName, ...params: any[]) {
      const callbacks = this.bus.get(id)
      if (callbacks === undefined) return
      callbacks.forEach((cb) => cb(...params))
    }
  }