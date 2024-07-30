import { createContext, useContext, ReactNode } from 'react'
import { EventBus } from './event-bus'

const bus = new EventBus()
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