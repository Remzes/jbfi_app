import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import authReducer, { loginUser, registerUser } from '../ducks/auth'
import { callNotification } from '../ducks/notification'
import citiesReducer, { getCities } from '../ducks/cities'

export const rootEpic = combineEpics(loginUser, registerUser, callNotification, getCities)

export const rootReducer = history => combineReducers({
  router: connectRouter(history), form,
  auth: authReducer,
  cities: citiesReducer
})