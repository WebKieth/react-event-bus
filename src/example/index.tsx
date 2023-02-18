import { useEffect, useState } from 'react'
import { useEventBusProvided, EventBusProvider } from '../lib'
import { Button, Header, Body } from './view'
import './index.css'

function Example() {
  const [count, setCount] = useState(0)
  const bus = useEventBusProvided()

  const handleHeaderSlotClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCount(count + 1)
  }

  useEffect(() => {
    bus.$on('onSlotHeaderClick', handleHeaderSlotClick)
    return () => bus.$un('onSlotHeaderClick', handleHeaderSlotClick)
  }, [count])

  return (
    <div className="App">
      <EventBusProvider>
        <Header>
          <h4>slot header button</h4>
          <Button onClick={(e) => bus.$emit('onSlotHeaderClick', e)}/>
        </Header>
        <Body>
          <h4>slot body counter</h4>
          {count}
        </Body>
      </EventBusProvider>
      {/* There is no need to wrap button with callback in Provider. It works still Provider is alive in render condition statement */}
      <div style={{ marginLeft: '28px' }}>
        <Button onClick={(e) => bus.$emit('onInnerHeaderClick', e)}/>
      </div>
    </div>
  )
}

export default Example
