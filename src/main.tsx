import React from 'react'
import ReactDOM from 'react-dom/client'
import Example from './example'
import { EventBusProvider, useEventBusProvided } from './lib'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>,
)

export { EventBusProvider, useEventBusProvided }
