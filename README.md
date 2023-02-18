# react-event-bus  
Event-based development providing for React

### installing  
```
yarn add react-event-bus
```
### usage  
Rendering Provider  
```
import { EventBusProvider } from 'react-event-bus'
...
/** Declare component and return provider in render */
return <EventBusProvider>{ children: ReactNode }</EventBusProvider>
```
  
Subscribe on event  
```
import { useEffect } from 'react'
import { useEventBusProvided } from 'react-event-bus'
const MyComponent = () => {
    const bus = useEventBusProvided()
    const handleMyBusEvent = (...args) => {
        console.log(`handling custom bus event with `, args)
    }
    useEffect(() => {
        bus.$on('onMyBusEvent', handleMyBusEvent)
        return () => bus.$un('onMyBusEvent', handleMyBusEvent)
    }, [bus])
    return {/** something */}
}
```
  
Calling (emitting) events  
```
import { useEventBusProvided } from 'react-event-bus'
const MyComponent = () => {
    const { $emit } = useEventBusProvided()
    return <div>
        <button onClick={(e) => $emit('onMyBusEvent', e)}></button>
    </div>
}
```

