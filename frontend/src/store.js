import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from 'redux-thunk'

import markerReducer from './reducers/markerReducer'

const reducer = combineReducers({
  markers: markerReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store