import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createEpicMiddleware } from 'redux-observable'

import { rootReducer, rootEpic } from './reducers'
import history from '../history'

// Create epic middleware
const epicMiddleware = createEpicMiddleware()

// Combine Reducers
const reducers = rootReducer(history)

// Middleware instance
const enhancer = applyMiddleware(routerMiddleware(history), epicMiddleware)
const store = createStore(reducers, enhancer)
epicMiddleware.run(rootEpic)
window.store = store

export default store