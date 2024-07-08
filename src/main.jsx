import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/scss/index.scss'
import { Provider } from 'react-redux'
import { movieStore } from './store.js'



ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={movieStore}>
    <App />
  </Provider>
)
